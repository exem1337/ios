<template>
  <div class="container">
    <div class="about">
      <h4>Справка</h4> 
      <ExpertAbout v-if="store.isExpert" />
      <StudentAbout v-else-if="store.isStudent" />
      <OperatorAbout v-else />   
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from 'src/stores/userStore';
import ExpertAbout from 'components/about/ExpertAbout.vue';
import StudentAbout from 'components/about/StudentAbout.vue';
import OperatorAbout from 'components/about/OperatorAbout.vue';
import { onBeforeMount } from 'vue';
import { AuthManager } from 'src/services/auth.service';
import { RouterGuardManager } from 'src/utils/routerGuard.util';
import { useRoute, useRouter } from 'vue-router';

const store = useUserStore();
const router = useRouter();
const route = useRoute();

onBeforeMount(async () => {
  await AuthManager.refresh(router);
  RouterGuardManager.useAuthGuard(router, route);
})
</script>

<style lang="scss" scoped>
.about {
  h4 {
    font-size: 24px;
    height: fit-content;  
    width: fit-content;
    margin: 0 auto;
    color: #616161;
    margin-bottom: 16px;
  }
}
</style>
