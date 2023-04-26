<template>
  <router-view />
</template>

<script setup lang="ts">
import { useMeta } from 'quasar';

useMeta({
  title: 'Адаптивная обучающая система',
});
</script>

<style lang="scss">
@import 'assets/styles/main.scss';
</style>
