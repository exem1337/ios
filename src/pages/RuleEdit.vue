<template>
  <div>
    <AppLoader v-if="isDataLoading" />
    <div v-else>
      <h4>{{ route.params.id ? 'Редактирование правила' : 'Создание правила' }}</h4>
      <div
        v-if="rule" 
        class="rule"
      >
        <div class="chart">
          <AppRuleEditItem 
            :dots="dots?.Topic_Time"
            :item="rule.Topic_Time"
            :name="ETermNames.TopicTime" 
            term-name="Topic_Time"
            v-model="rule.Topic_Time"
          />
        </div>
        <div class="chart">
          <AppRuleEditItem 
            :dots="dots?.Test_Difficulty"
            :item="rule.Test_Difficulty"
            :name="ETermNames.TestDifficuilty" 
            term-name="Test_Difficulty"
            v-model="rule.Test_Difficulty"
          />
        </div>
        <div class="chart">
          <AppRuleEditItem 
            :dots="dots?.Correct_Percentage"
            :item="rule.Correct_Percentage"
            :name="ETermNames.CorrectPercentage" 
            term-name="Correct_Percentage"
            v-model="rule.Correct_Percentage"
          />
        </div>
        <div class="chart">
          <AppRuleEditItem 
            :dots="dots?.Answer_Time"
            :item="rule.Answer_Time"
            :name="ETermNames.AnswerTime" 
            term-name="Answer_Time"
            v-model="rule.Answer_Time"
          />
        </div>
        <div class="chart">
          <AppRuleEditItem 
            :dots="dots?.Result"
            :item="rule.Result"
            :name="ETermNames.Result" 
            term-name="Result"
            v-model="rule.Result"
            saveable
            @save="onSave"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import AppRuleEditItem from 'components/AppRuleEditItem.vue';
import AppLoader from 'components/AppLoader.vue';
import { api } from 'src/boot/axios';
import { EPercentageFuzzyStatuses, ETermNames, ETimeFuzzyStatuses, ETopicTimeFuzzyStatuses } from 'src/enums/fuzzyNames.enum';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IRule, IRuleDotsResponse } from '../models/rules.model';
import { ERuleResultLevels } from 'src/enums/rule.enum';
import { RouterGuardManager } from 'src/utils/routerGuard.util';
import { AuthManager } from 'src/services/auth.service';

const rule = ref<IRule>();
const route = useRoute();
const dots = ref<IRuleDotsResponse>();
const router = useRouter();
const isDataLoading = ref(true);

async function onSave() {
  if (!route.params.id) {
    await api.post('/postIosRule', {
      answerTime: rule.value?.Answer_Time.toLowerCase(),
      correctPercentage: rule.value?.Correct_Percentage.toLowerCase(),
      result: rule.value?.Result.toLowerCase(),
      testDifficulty: rule.value?.Test_Difficulty.toLowerCase(),
      topicTime: rule.value?.Topic_Time.toLowerCase(),
    })
  }

  else await api.patch(`/editIosRule/${route.params.id}`, {
    answerTime: rule.value?.Answer_Time.toLowerCase(),
    correctPercentage: rule.value?.Correct_Percentage.toLowerCase(),
    result: rule.value?.Result.toLowerCase(),
    testDifficulty: rule.value?.Test_Difficulty.toLowerCase(),
    topicTime: rule.value?.Topic_Time.toLowerCase(),
  });
  router.push(`/expert`);
}

onBeforeMount(async () => {
  await AuthManager.refresh(router);
  RouterGuardManager.useAuthGuard(router, route);

  if (!route.params.id) {
    rule.value = {
      Key: 0,
      Answer_Time: ETimeFuzzyStatuses.Slow,
      Correct_Percentage: EPercentageFuzzyStatuses.Incorrect,
      Test_Difficulty: ERuleResultLevels.Newbie,
      Topic_Time: ETimeFuzzyStatuses.Slow,
      Result: ERuleResultLevels.Newbie
    }

    dots.value = {
      Answer_Time: await api.get(`/getTermDotsIos?name=Answer_Time&value=${ETimeFuzzyStatuses.Slow.toLowerCase()}`).then((res) => res.data.Data),
      Result: await api.get(`/getTermDotsIos?name=Result&value=${ERuleResultLevels.Newbie.toLowerCase()}`).then((res) => res.data.Data),
      Correct_Percentage: await api.get(`/getTermDotsIos?name=Correct_Percentage&value=${EPercentageFuzzyStatuses.Incorrect.toLowerCase()}`).then((res) => res.data.Data),
      Topic_Time: await api.get(`/getTermDotsIos?name=Topic_Time&value=${ETopicTimeFuzzyStatuses.Slow.toLowerCase()}`).then((res) => res.data.Data),
      Test_Difficulty: await api.get(`/getTermDotsIos?name=Test_Difficulty&value=${ERuleResultLevels.Newbie.toLowerCase()}`).then((res) => res.data.Data),
    }

    isDataLoading.value = false;
    return;
  }

  const res = await api.get(`/getIosRule/${route.params.id}`)?.then((res) => res.data.Data)
  rule.value = res.rule;
  dots.value = res.dots;
  isDataLoading.value = false;
})
</script>

<style lang="scss" scoped>
h4 {
  font-size: 24px;
  height: fit-content;  
  width: fit-content;
  margin: 0 auto;
  color: #616161;
}

.rule {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 40px;

  .chart {
    margin-bottom: 200px;
  
    div {
      width: 500px !important;
      height: 300px !important;
  
      canvas {
        width: 500px !important;
        height: 300px !important;
      }
    }
  }
}
</style>