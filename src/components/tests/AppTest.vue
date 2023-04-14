<template>
  <div>
    <h5>Тестирование по теме 1 - Основы языка c++</h5>
    <AppTestQuestion
      v-if="!isTestFinished"
      :question="test?.questions?.[currentQuestionIndex]"
      :key="test?.questions?.[currentQuestionIndex]?.id"
      @answer="onQuestionAnswer"
    />
    <AppTestResults v-else :answers="answers" :questions="test.questions" />
  </div>
</template>

<script lang="ts" setup>
import { ITest, ITestUserAnswer } from 'src/models/test.model';
import { ref } from 'vue';
import AppTestQuestion from 'src/components/tests/AppTestQuestion.vue';
import AppTestResults from 'src/components/tests/AppTestResults.vue';

const props = defineProps<{
  test: ITest;
}>();

const currentQuestionIndex = ref(0);
const answers = ref<Array<ITestUserAnswer>>([]);
const isTestFinished = ref(false);

const onQuestionAnswer = (answer: ITestUserAnswer) => {
  answers.value.push(answer);

  if (currentQuestionIndex.value === props.test?.questions?.length - 1) {
    isTestFinished.value = true;
    return;
  }

  currentQuestionIndex.value++;
};
</script>
