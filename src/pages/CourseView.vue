<template>
  <div class="course">
    <div
      v-if="!isTopicLoading && pdfSrc" 
      class="topic-controls shadow"
    >
      <q-btn
        :disable="currentPage == 1" 
        icon="remove" 
        color="secondary" 
        round 
        @click="currentPage--"
      />
      <span>{{ currentPage }} из {{ numOfPages }}</span>
      <q-btn 
        :disable="currentPage == numOfPages"
        icon="add" 
        color="secondary" 
        round
        @click="currentPage++" 
      />
    </div>
    <div class="course--left-panel">
      <TopicList
        :topics="topics"
        :current-topic="currentTopic"
        @select="onTopicSelect"
      />
      <div>
        <q-tooltip
          v-if="!currentTopicRef?.Test_Key"
          class="bg-brown-8"
        >
          Для данной темы не был добавлен тестовый материал
        </q-tooltip>
        <q-tooltip
          v-else-if="isCurrentTestDisabled"
          class="bg-brown-8"
        >
          Данный тест уже пройден
        </q-tooltip>
        <q-btn
          color="secondary" 
          :to="`/test/${currentTopicRef?.Test_Key}/${currentTopicRef?.MaterialKey}`"
          :disable="!currentTopicRef?.Test_Key || isCurrentTestDisabled"
        >
          Пройти тестирование
        </q-btn>
        
      </div>
    </div>
    <div class="course__wrapper">
      <AppLoader v-if="isTopicLoading" />
      <p 
        v-else-if="!topics.length"
        class="course--empty"
      >
        К данной дисциплине не прикреплен обучающий материал
      </p>
      <div
        v-else-if="!pdfSrc" 
        class="no-topic"
      >
        Для данной темы не был загружен обучающий материал
      </div>
      <VuePdf
        v-else
        :key="currentPage"
        :src="pdfSrc"
        :page="currentPage"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { VuePdf, createLoadingTask } from 'vue3-pdfjs/esm';
import { VuePdfPropsType } from 'vue3-pdfjs/components/vue-pdf/vue-pdf-props'; // Prop type definitions can also be imported
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
import { onMounted, ref, computed, onBeforeUnmount, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from 'src/boot/axios';
import { IDisciplineDifficulty, IDisciplineTopic } from 'src/models/course.model';
import { IBasedResponse } from 'src/models/api.model';
import TopicList from 'components/TopicList.vue';
import { FileService } from 'src/services/file.service';
import AppLoader from 'components/AppLoader.vue';
import { useUserStore } from 'src/stores/userStore';
import { IUserStatus } from '../models/user.model';
import { AuthManager } from 'src/services/auth.service';
import { RouterGuardManager } from 'src/utils/routerGuard.util';

const pdfSrc = ref<VuePdfPropsType['src']>(
  // 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
);
const numOfPages = ref(0);
const topics = ref<Array<IDisciplineTopic>>([]);
const currentTopic = ref(1);
const route = useRoute();
const currentPage = ref(0);
const isTopicLoading = ref(false);
const currentTopicRef = computed(() => topics.value.find((topic) => topic.Key === currentTopic.value));
const isCurrentTestDisabled = ref(false);
const store = useUserStore();
const testResults = ref();
const startTime = ref();
const router = useRouter();

async function logTime() {
  const timeToLog = (new Date().getTime() - startTime.value.getTime()) / 1000;
  await api.post('/addEduTime', {
    time: timeToLog, 
    physKey: store.getUser.id,
    topicMaterialKey: currentTopicRef.value?.MaterialKey,
  });
  startTime.value = new Date();
}

async function onTopicSelect(key: number) {
  await logTime();
  currentTopic.value = key;
  await loadTopic(currentTopicRef.value?.File_Link || '');

  if (!currentTopicRef.value?.Test_Key) {
    isCurrentTestDisabled.value = true;
    return;
  }

  isCurrentTestDisabled.value = !!testResults.value?.find((test) => test.Test_Key === currentTopicRef.value?.Test_Key);
}

async function loadTopic(fileUrl: string) {
  if (!fileUrl) {
    pdfSrc.value = '';
    return;
  }

  isTopicLoading.value = true;
  const file = await FileService.getFile(fileUrl, 'application/pdf')
  const url = URL.createObjectURL(file)
  pdfSrc.value = url;
  const loadingTask = createLoadingTask(pdfSrc.value);
  loadingTask.promise.then((pdf: PDFDocumentProxy) => {
    numOfPages.value = pdf.numPages;
  });
  currentPage.value = 1;
  isTopicLoading.value = false;
}

onBeforeMount(async () => {
  await AuthManager.refresh(router);
  RouterGuardManager.useAuthGuard(router, route);
})

onMounted(async () => {
  topics.value = await api.get<IBasedResponse<Array<IDisciplineTopic>>>(`/getTopics?discipline=${route.params.id}`)
    .then((res) => res.data.Data.sort((a, b) => a.Number - b.Number).filter((topic) => topic.Diff_Level_Key));

  if (!topics.value.length) {
    return;
  }

  let status: IUserStatus = await api.get(`/getStoredStatusIos?physKey=${store.getUser.id}&disciplineKey=${route.params.id}&last=true`).then((res) => res.data.Data);
  status = await api.get(`/getStoredStatus?physKey=${store.getUser.id}&disciplineKey=${disc.Key}&last=true`).then((res) => res.data.Data);
  const diffs: Array<IDisciplineDifficulty> = await api.get('/getSlojnaList').then((res) => res.data.Data);
  const diffKey = diffs.find((el) => el.Name?.toLowerCase() === status.Status.toLowerCase())?.Key;
  topics.value = topics.value.filter((el) => el.Diff_Level_Key === diffKey);  

  await loadTopic(topics.value?.[0].File_Link);
  currentTopic.value = topics.value[0]?.Key;
  testResults.value = await api.get(`getTestResults/${store.getUser.id}`).then((res) => res.data.Data);
  isCurrentTestDisabled.value = !!testResults.value?.find((res) => res.Test_Key === topics.value[0]?.Test_Key)
  startTime.value = new Date();
});

onBeforeUnmount(async () => {
  await logTime();
})
</script>

<style lang="scss" scoped>
.course {
  display: flex;
  align-items: flex-start;
  position: relative;

  &--left-panel {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-left: 16px;
  }

  &--empty {
    font-size: 24px;
    font-weight: 500;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 240px;
  }

  .topic-controls {
    position: fixed;
    top: 58px;
    right: 10%;
    border-radius: 4px;
    background-color: #6d4c41;
    display: flex;
    align-items: center;
    width: 170px;
    justify-content: space-between;
    padding: 16px 8px;
    z-index: 500;

    span {
      font-weight: 500;
      font-size: 16px;
      color: #fff;
    }
  }

  &__wrapper {
    width: 100%;
    margin-left: 16px;
    margin-right: 16px;
    position: relative;

    .no-topic {
      margin: 0 auto;
      margin-top: 204px;
      width: 100%;
      display: flex;
      justify-content: center;
      font-size: 24px;
    }

    .vue-pdf-main {
      min-height: 100vh;

      :deep(.canvas) {
        height: 100vh !important;
      }
    }
  }
}
</style>
