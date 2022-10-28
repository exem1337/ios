<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated bordered>
      <q-toolbar class="bg-brown-8">
        <q-toolbar-title> АОС </q-toolbar-title>
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
        <q-btn stretch flat label="Выход" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>
