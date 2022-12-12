<template>
  <div>
    edit
    <q-btn :to="`/courses/${route.params.id}/edit/test`">выф</q-btn>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const onGoToEdit = (id: number) => {
  router.replace(`/courses/${id}/edit`);
};
</script>

<style lang="scss" scoped></style>
