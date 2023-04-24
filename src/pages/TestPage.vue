<template>
  <AppLoader v-if="isDataLoading" />
  <AppTestWrapper
    v-else 
    :test="test"
    :edu-time="eduTime"
  />
</template>

<script lang="ts" setup>
import { ITestResponse } from 'src/models/test.model';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppTestWrapper from 'components/AppTestWrapper.vue';
import AppLoader from 'components/AppLoader.vue';
import { TestService } from 'src/services/test.service';
import { api } from 'src/boot/axios';
import { useUserStore } from 'src/stores/userStore';
import { IEduTime } from 'src/models/fuzzy.model';
import { AuthManager } from 'src/services/auth.service';
import { RouterGuardManager } from 'src/utils/routerGuard.util';

const route = useRoute();
const isDataLoading = ref();
const router = useRouter();
const eduTime = ref<Array<IEduTime>>();
const test = ref<ITestResponse>();
const store = useUserStore();

onBeforeMount(async () => {
  await AuthManager.refresh(router);
  RouterGuardManager.useAuthGuard(router, route);
  
  isDataLoading.value = true;
  test.value = await TestService.getTest(Number(route.params.id), router);
  eduTime.value = await api.get(`/getEduTime?physKey=${store.getUser.id}&topicMaterialKey=${route.params.materialId}`).then((res) => res.data.Data)

  isDataLoading.value = false;
})
</script>

<style lang="scss" scoped></style>
