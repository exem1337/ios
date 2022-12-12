<template>
  <div class="create-test">
    <div
      v-for="question in internalQuestions"
      :key="question.id"
      class="test-question"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ITestQuestion } from 'src/models/test.model';
import { ref } from 'vue';

const props = defineProps<{
  questions: Array<ITestQuestion> | undefined;
}>();

const internalQuestions = ref<Array<ITestQuestion>>(props.questions ?? []);
</script>

<style lang="scss" scoped></style>
