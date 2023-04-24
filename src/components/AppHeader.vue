<template>
  <q-header elevated bordered>
    <q-toolbar class="bg-brown-8">
      <q-toolbar-title> АОС </q-toolbar-title>
      <template v-if="isShowNav">
        <q-btn 
          v-if="userStore.isExpert"
          to="/expert" 
          stretch 
          flat 
          label="Экспертная система" 
          :class="{ 'selected' : route.path.includes('/expert') }"
        />
        <q-btn 
          to="/courses" 
          stretch 
          flat 
          label="Дисциплины" 
          :class="{ 'selected' : route.path.includes('/courses') }"
        />
        <q-btn 
          to="/profile" 
          stretch 
          flat 
          label="Профиль" 
          :class="{ 'selected' : route.path.includes('/profile') }"
        />
        <q-btn 
          to="/profile" 
          stretch 
          flat 
          label="Профиль" 
          :class="{ 'selected' : route.path.includes('/profile') }"
        />
        <q-btn 
          v-if="userStore.isExpert"
          to="/operator" 
          stretch 
          flat 
          label="Пользователи" 
          :class="{ 'selected' : route.path.includes('/operator') }"
        />
        <q-btn stretch flat label="Выход" @click="onLogout" />
      </template>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
import { AuthManager } from 'src/services/auth.service';
import { useUserStore } from 'src/stores/userStore';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const userStore = useUserStore();
const isShowNav = computed(() => userStore.isLoggedIn);
const router = useRouter();
const route = useRoute();

const onLogout = () => {
  AuthManager.logout(userStore, router);
};
</script>

<style lang="scss" scoped>
.selected {
  background-color: #6d4c41;
}
</style>
