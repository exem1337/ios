<template>
  <q-header elevated>
    <q-toolbar class="primary">
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
        <q-btn 
          to="/about" 
          stretch 
          flat 
          label="Справка" 
          :class="{ 'selected' : route.path.includes('/about') }"
        />
        <q-btn stretch flat label="Выход" @click="onLogout" />
        <p v-if="currentStatus">Уровень доступа: {{ currentStatus }}</p>
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
const currentStatus = computed(() => {
  if (!userStore.isLoggedIn) {
    return '';
  }

  return userStore.isExpert ? 'Эксперт' : userStore.isStudent ? 'Студент' : 'Оператор';
})

const onLogout = () => {
  AuthManager.logout(userStore, router);
};
</script>

<style lang="scss" scoped>
.selected {
  background-color: darken($primary, 5%) !important;
}

.q-btn::before {
  box-shadow: none;
}

p {
  margin-bottom: 0;
  font-size: 16px;
  margin-left: 8px;
}
</style>
