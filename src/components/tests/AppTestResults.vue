<template>
  <div>result {{ correctPercentage }}</div>
</template>

<script lang="ts" setup>
import { ITestQuestion, ITestUserAnswer } from 'src/models/test.model';
import { onBeforeMount, ref } from 'vue';
import { TestManager } from 'src/services/test.service';

const props = defineProps<{
  questions: Array<ITestQuestion>;
  answers: Array<ITestUserAnswer>;
}>();

const testManager = new TestManager();
const correctPercentage = ref(0);

onBeforeMount(() => {
  correctPercentage.value = testManager.checkTestCorrectivity(
    props.questions,
    props.answers
  );
});
</script>
