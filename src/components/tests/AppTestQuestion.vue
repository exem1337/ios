<template>
  <div>
    <div>{{ question.title }}</div>
    <div>
      <q-radio
        v-for="answer in question.answers"
        :key="answer.id"
        v-model="currentAnswer.answerId"
        :val="answer.id"
        :label="answer.text"
      />
    </div>
    <q-btn @click="$emit('answer', currentAnswer)">Ответить</q-btn>
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'fs';
import { ITestQuestion, ITestUserAnswer } from 'src/models/test.model';
import { onBeforeMount, ref } from 'vue';

const props = defineProps<{
  question: ITestQuestion;
}>();

defineEmits<{
  (e: 'answer', value: ITestUserAnswer): void;
}>();

const currentAnswer = ref<ITestUserAnswer>({
  questionId: props.question.id,
  answerId: 0,
});

// watch(
//   () => props.question.id,
//   (newValue: ITestQuestion) => {
//     currentAnswer.value.questionId = newValue.id;
//   }
// );
</script>
