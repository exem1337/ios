<template>
  <q-header elevated bordered>
    <q-toolbar class="bg-brown-8">
      <q-toolbar-title> Адаптивная Обучающая Система </q-toolbar-title>
      <template v-if="isShowNav">
        <q-btn-dropdown 
          v-if="userStore.isExpert || userStore.isOperator"
          color="primary" 
          stretch 
          label="Экспертная система"
          :class="{ 'selected' : route.path.includes('/expert') }"
        >
          <q-list>
            <q-item 
              clickable 
              v-close-popup 
              @click="router.push('/expert')"
            >
              <q-item-section>
                <q-item-label>База правил</q-item-label>
              </q-item-section>
            </q-item>

            <q-item 
              clickable 
              v-close-popup 
              @click="router.push('/expert/dots')"
            >
              <q-item-section>
                <q-item-label>Редактирование лингвистических переменных</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
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
          v-if="userStore.isOperator"
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
  background-color: #6d4c41 !important;
}

.q-btn::before {
  box-shadow: none;
}
</style>
