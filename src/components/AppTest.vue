<template>
  <div class="test">
    <q-card>
      <h4>{{ test.Name }}</h4>

      <div 
        class="test__question"
      >
        <div class="test__question--header">
          <p>Вопрос {{ currentQuestionKey + 1 }}</p>
          <p>{{ test.Questions?.[currentQuestionKey]?.Header }}</p>
  
          <img 
            v-if="test.Questions?.[currentQuestionKey]?.Img"
            :src="`data:image/png;base64,${test.Questions?.[currentQuestionKey]?.Img}`" 
            alt="картинка"
          >
        </div>

        <div 
          v-for="answer in test.Questions?.[currentQuestionKey]?.Answer" 
          :key="answer.Key"
          class="test__question--answer"
        >
          <q-radio  
            v-model="currentAnswer" 
            :val="answer.Key" 
            :label="answer.Text" 
          />

          <img
            v-if="answer.Img" 
            :src="`data:image/png;base64,${answer?.Img}`"
          />
        </div>
      </div>
      
      <q-btn 
        :disable="!currentAnswer"
        color="secondary"
        @click="onAnswer"
      >
        Продолжить
      </q-btn>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { api } from 'src/boot/axios';
import { ITest, ITestComplete } from 'src/models/test.model';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  test: ITest;
}>();

const emits = defineEmits<{
  (e: 'comleted', value: ITestComplete): void;
}>()

const currentAnswer = ref();
const currentQuestionKey = ref(0);
const rightAnswers = ref(0);
const startDate = ref();
const answerTimes = ref<Array<number>>([])

async function onAnswer() {
  const result = await api.get(`/validateAnswer?questionKey=${props.test.Questions?.[currentQuestionKey.value].Key}&answerKey=${currentAnswer.value}`)
  .then((res) => res.data.Data.CorrectFloat);
  rightAnswers.value += result;
  currentAnswer.value = null;
  if (currentQuestionKey.value + 1 === props.test.Questions?.length) {
    emits('comleted', { 
      correct: rightAnswers.value,
      time: answerTimes.value
    });
  }
  answerTimes.value.push((new Date().getTime() - startDate.value.getTime()) / 1000);
  currentQuestionKey.value++;
  startDate.value = new Date();
}

onMounted(() => {
  startDate.value = new Date();
})
</script>

<style lang="scss" scoped>
.test {
  width: 100%;
  img {
    max-width: 400px;
    max-height: 400px;
    object-fit: contain;
  }
  .q-card {
    width: fit-content;
    min-width: 50vw;
    max-width: 80vw;
    margin: 0 auto;
    padding: 24px;
    margin-top: 20px;
    margin-bottom: 20px;
    position: relative;
    h4 {
      margin-top: 0;
      overflow-wrap: break-word;
    }
    .test__question {
      display: flex;
      flex-direction: column;
      margin-bottom: 24px;
      .q-radio {
        margin-left: -10px;
      }
    }
    .q-btn {
      position: absolute;
      bottom: 14px;
      right: 14px;
    }
  }
}
</style>