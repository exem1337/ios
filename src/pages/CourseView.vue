<template>
  <div class="course">
    <div
      v-if="!isTopicLoading" 
      class="topic-controls shadow"
    >
      <q-btn
        :disable="currentPage == 0" 
        icon="remove" 
        color="secondary" 
        round 
        @click="currentPage--"
      />
      <span>{{ currentPage + 1 }} из {{ numOfPages + 1 }}</span>
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
      <q-btn
        color="secondary" 
        :to="`/test/${route.params.id}`"
      >
        Пройти тестирование
      </q-btn>
    </div>
    <div class="course__wrapper">
      <AppLoader v-if="isTopicLoading" />
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
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { api } from 'src/boot/axios';
import { IDisciplineTopic } from 'src/models/course.model';
import { IBasedResponse } from 'src/models/api.model';
import TopicList from 'components/TopicList.vue';
import { FileService } from 'src/services/file.service';
import AppLoader from 'components/AppLoader.vue';

const pdfSrc = ref<VuePdfPropsType['src']>(
  // 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
);
const numOfPages = ref(0);
const topics = ref<Array<IDisciplineTopic>>([]);
const currentTopic = ref(1);
const route = useRoute();
const currentPage = ref(0);
const isTopicLoading = ref(true);

function onTopicSelect(key: number) {
  currentTopic.value = key;
}

async function loadTopic(fileUrl: string) {
  isTopicLoading.value = true;
  const file = await FileService.getFile(fileUrl, 'application/pdf')
  const url = URL.createObjectURL(file)
  pdfSrc.value = url;
  console.log(url)
  const loadingTask = createLoadingTask(pdfSrc.value);
  loadingTask.promise.then((pdf: PDFDocumentProxy) => {
    numOfPages.value = pdf.numPages;
  });
  isTopicLoading.value = false;
}

onMounted(async () => {
  topics.value = await api.get<IBasedResponse<Array<IDisciplineTopic>>>(`/getTopics?discipline=${route.params.id}`)
    .then((res) => res.data.Data.sort((a, b) => a.Number - b.Number));
  await loadTopic(topics.value?.[0].File_Link);
  
});
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
      color: #5d4037;
    }
  }

  &__wrapper {
    width: 100%;
    margin-left: 16px;
    margin-right: 16px;
    position: relative;

    .vue-pdf-main {
      min-height: 100vh;

      :deep(.canvas) {
        height: 100vh !important;
      }
    }
  }
}
</style>
