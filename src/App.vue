<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { FuzzyService } from 'src/services/fuzzy.service';
import { EFuzzyStatuses } from './enums/fuzzyNames.enum';

onMounted(() => {
  const mamdani = new FuzzyService();
  console.log(mamdani.startMamdani(5, EFuzzyStatuses.Expert, 90));
});
</script>

<style lang="scss">
@import 'assets/styles/main.scss';
</style>
