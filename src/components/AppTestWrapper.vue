<template>
  <div v-if="!isShowBanner">
    <AppTest 
      :test="test"
      @comleted="onTestCompleted"
    />
  </div>
  <q-card 
    v-else
    class="complete-banner"
  >
    Вы прошли Тестирование <br>
    Ващ результат: {{ prop?.resultTerm }}
    <q-btn
      color="primary"
      :loading="isButtonLoading"
      @click="onShowModal"
    >
      Подробнее
    </q-btn>
    <q-btn
      color="primary" 
      @click="onReturnToDisciplines"
    >
      Вернуться к списку дисциплин
    </q-btn>
  </q-card>

  <AppModal 
    v-model="isShowModal" 
    :options="modalProps" 
    :componentProps="prop"
    @show="isButtonLoading = false"
    @close="isShowModal = false"
  />
</template>

<script lang="ts" setup>
import { api } from 'src/boot/axios';
import AppTest from 'src/components/AppTest.vue';
import { ITest, ITestComplete } from 'src/models/test.model';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FuzzyResult from 'components/FuzzyResult.vue';
import AppModal from 'components/AppModal.vue'
import { IModalProps } from 'src/models/modal.model';
import { useUserStore } from 'src/stores/userStore';
import { IEduTime } from 'src/models/fuzzy.model';
import { TestService } from 'src/services/test.service';
import { difficultyMap } from 'src/constants/difficultyMap.const';
// import { STATUS_RESULT } from 'src/constants/statusResult.const';

const props = defineProps<{
  test: ITest;
  eduTime: Array<IEduTime>;
}>()

const modalProps: IModalProps = {
  hideFooter: true,
  headerText: 'Результаты тестирования',
  component: FuzzyResult,
}

const isShowModal = ref(false);
const isShowBanner = ref(false);
const store = useUserStore();
const route = useRoute();
const router = useRouter();
const currentStatus = ref();
const prop = ref();
const isButtonLoading = ref(false);
const testEduDelta = ref();
const answerTimeDelta = ref();
const correctPercentage = ref();

function onReturnToDisciplines() {
  router.push('/courses');
}

async function onTestCompleted(result: ITestComplete) {
  testEduDelta.value = TestService.getEduTimeDelta(props.eduTime);
  answerTimeDelta.value = TestService.getAnswerTimeDelta(result.time);

  await api.post('/submitResult', {
    result: `${result.correct}/${props.test.Questions?.length}`,
    physKey: store.getUser.id,
    testKey: Number(route.params.id),
    discipKey: props.test.Discipline?.Key,
  })
  correctPercentage.value = Math.round(result.correct / props.test.Questions?.length * 100);
  isShowBanner.value = true;
}

async function getBannerData(test: number, answer: number, correct: number) {
  const key = await api.post('/addEduTime', {
    time: props.eduTime.reduce((acc, val) => acc += val.Time, 0), 
    physKey: store.getUser.id,
    topicMaterialKey: route.params.materialId,
  }).then((res) => res.data.Data.Key)

  const diff = difficultyMap.get(props.test.IosDifficulty.Name.toLowerCase());
  currentStatus.value = await api.get(`/fuzzyResult?ios=true&physKey=${store.getUser.id}&disciplineKey=${props.test.Discipline?.Key}&eduTimeKey=${key}&t1=${diff}&t2=${answer}&t3=${correct}&t4=${test}`);
  // currentStatus.value = STATUS_RESULT;
  const ruleGraphs = [];
  const rules = Object.keys(currentStatus.value).filter((key) => key.includes('RuleId'));
 
  rules.forEach((rule) => {
    const ruleItem = { x: [...currentStatus.value[rule][0]], y: [...currentStatus.value[rule][1]] };

    for (let i = ruleItem.x.length - 1; i >= 0; i--) {
      if (ruleItem.y[i] > 0 && ((ruleItem.x[i+1] && ruleItem.x[i+1] >= currentStatus.value.Result && ruleItem.x[i-1] < currentStatus.value.Result))) {
        ruleGraphs.push(ruleItem);
      }
    }
  })
  prop.value = {
    result: currentStatus.value.Result,
    resultTerm: currentStatus.value.Result_term,
    resultFunc: currentStatus.value.ResultFunc,
    graphs: ruleGraphs
  }
}

async function onShowModal() {
  isButtonLoading.value = true;
  await getBannerData(testEduDelta.value, answerTimeDelta.value, correctPercentage.value);
  isShowModal.value = true;
}

onBeforeMount(async () => {
  const result = await api.get('/fuzzyResult?ios=true&physKey=3&disciplineKey=1&eduTimeKey=4&t1=25&t2=50&t3=67&t4=80');
})
</script>

<style lang="scss" scoped>
.complete-banner {
  padding: 8px;
  margin: 0 auto;
  margin-top: calc(50% - 300px);
  display: flex;
  flex-direction: column;
  height: 150px;
  justify-content: space-between;
  width: fit-content;
}
</style>