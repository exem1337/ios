<template>
  <div></div>
</template>

<script lang="ts" setup>
import { ITestAnswer } from 'src/models/test.model';
import { ref } from 'vue';

const props = defineProps<{
  modelValue: Array<ITestAnswer>;
}>();

const internalAnswers = ref<Array<ITestAnswer>>(props.modelValue);
</script>
