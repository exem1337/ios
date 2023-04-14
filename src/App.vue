<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUpdate, onMounted } from 'vue';
// import { FuzzyService } from 'src/services/fuzzy.service';
// import { EFuzzyStatuses } from './enums/fuzzyNames.enum';
// import { AuthManager } from './services/auth.service';
import { useMeta } from 'quasar';
import { useRouter } from 'vue-router';
import { AuthManager } from './services/auth.service';
import { RouterGuardManager } from './utils/routerGuard.util';

useMeta({
  title: 'Адаптивная обучающая система',
});

const router = useRouter();

onMounted(() => {
  // const mamdani = new FuzzyService();
  // console.log(mamdani.startMamdani(5, EFuzzyStatuses.Professional, 90));
});

onBeforeMount(async () => {
  await AuthManager.refresh(router);
  RouterGuardManager.useAuthGuard(router);
})

onBeforeUpdate(() => {
  RouterGuardManager.useAuthGuard(router);
})
</script>

<style lang="scss">
@import 'assets/styles/main.scss';
</style>
