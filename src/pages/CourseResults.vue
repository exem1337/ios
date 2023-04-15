<template>
  <div class="course-results">
    sas
  </div>
</template>

<script lang="ts" setup>
import { api } from 'src/boot/axios';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const results = ref();

onBeforeMount(async () => {
  results.value = await api.get(`/getDisciplineResults/${route.params.id}`).then((res) => res.data.Data);
})
</script>