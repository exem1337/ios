<template>
  <AppLoader v-if="isDataLoading" />
  <AppTestWrapper
    v-else 
    :test="test"
  />
</template>

<script lang="ts" setup>
import { ITestResponse } from 'src/models/test.model';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppTestWrapper from 'components/AppTestWrapper.vue';
import AppLoader from 'components/AppLoader.vue';
import { TestService } from 'src/services/test.service';

const route = useRoute();
const isTestStarted = ref(false);
const isDataLoading = ref();
const router = useRouter();

const test = ref<ITestResponse>();

const startTimer = () => {
  //
};

const onStartTest = () => {
  isTestStarted.value = true;
  startTimer();
};

onBeforeMount(async () => {
  isDataLoading.value = true;
  test.value = await TestService.getTest(Number(route.params.id), router);
  isDataLoading.value = false;
})
</script>

<style lang="scss" scoped></style>
