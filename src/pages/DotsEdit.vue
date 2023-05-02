<template>
  <div class="dots">
    <AppLoader v-if="isDataLoading" />
    <div
      v-else 
      class="dots__items"
    >
      <DotsEditItem 
        v-for="item in dots" 
        :dot="item"
        :key="item.Key"
        @save="loadData"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from 'src/boot/axios';
import { ISystemDot } from 'src/models/fuzzy.model';
import { AuthManager } from 'src/services/auth.service';
import { RouterGuardManager } from 'src/utils/routerGuard.util';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DotsEditItem from 'components/DotsEditItem.vue';
import AppLoader from 'components/AppLoader.vue';

const router = useRouter();
const route = useRoute();
const dots = ref<Array<ISystemDot>>([]);
const isDataLoading = ref(false);

async function loadData() {
  isDataLoading.value = true;
  dots.value = await api.get<Array<ISystemDot>>('/getSystemDots/1').then((res) => res.data);
  isDataLoading.value = false;
}

onBeforeMount(async () => {
  await AuthManager.refresh(router);
  RouterGuardManager.useAuthGuard(router, route);
  await loadData();
})
</script>

<style lang="scss" scoped>
.dots {
  max-width: 80vw;
  margin: 0 auto;
  margin-top: 24px;
  margin-bottom: 24px;

  &__items {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
  }
}
</style>