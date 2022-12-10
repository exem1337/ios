<template>
  <q-header elevated bordered>
    <q-toolbar class="bg-brown-8">
      <q-toolbar-title> АОС </q-toolbar-title>
      <template v-if="isShowNav">
        <q-btn-dropdown stretch flat label="Экспертная система">
          <q-list>
            <q-item-label header>Экспертная система</q-item-label>
            <q-item
              v-for="n in 3"
              :key="`x.${n}`"
              clickable
              v-close-popup
              tabindex="0"
            >
              <q-item-section avatar>
                <q-avatar icon="folder" color="secondary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Photos</q-item-label>
                <q-item-label caption>February 22, 2016</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="info" />
              </q-item-section>
            </q-item>
            <q-separator inset spaced />
            <q-item-label header>Files</q-item-label>
            <q-item
              v-for="n in 3"
              :key="`y.${n}`"
              clickable
              v-close-popup
              tabindex="0"
            >
              <q-item-section avatar>
                <q-avatar
                  icon="assignment"
                  color="primary"
                  text-color="white"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Vacation</q-item-label>
                <q-item-label caption>February 22, 2016</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="info" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn to="/courses" stretch flat label="Дисциплины" />
        <q-btn to="/profile" stretch flat label="Профиль" />
        <q-btn to="/about" stretch flat label="Справка" />
        <q-btn stretch flat label="Выход" @click="onLogout" />
      </template>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
import { useUserStore } from 'src/stores/userStore';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const isShowNav = computed(() => userStore.getUser?.id);
const router = useRouter();

const onLogout = () => {
  userStore.clearUser();
  router.push('/');
};
</script>
