<template>
  <div class="question">
    <q-input v-model="modelValue.title" />
    <div v-if="modelValue.answers" class="question--answers">
      <q-radio
        v-for="answer in modelValue.answers"
        :key="answer.id"
        val=""
        model-value=""
        @click="onAnswerClick(answer.id)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ITestQuestion } from 'src/models/test.model';
import { ref } from 'vue';

const props = defineProps<{
  modelValue: ITestQuestion;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: ITestQuestion): void;
}>();

const onAnswerClick = (id: number) => {
  emits('update:modelValue', {
    title: props.modelValue.title,
    id: props.modelValue.id,
    answers: props.modelValue.answers.map((ans) => ({
      ...ans,
      isCorrect: ans.id === id,
    })),
  });
};
</script>
