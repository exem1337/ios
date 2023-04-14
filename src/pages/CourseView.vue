<template>
  <div class="course">
    <div class="course--left-panel">
      <TopicList
        :topics="topics"
        :current-topic="currentTopic"
        @select="onTopicSelect"
      />
      <q-btn :to="`/test/${route.params.id}`">Пройти тестирование</q-btn>
    </div>
    <div class="course__wrapper">
      <VuePdf
        v-for="page in numOfPages"
        :key="page"
        :src="pdfSrc"
        :page="page"
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

const pdfSrc = ref<VuePdfPropsType['src']>(
  // 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
);
const numOfPages = ref(0);
const topics = ref<Array<IDisciplineTopic>>([]);
const currentTopic = ref(1);
const route = useRoute();

function onTopicSelect(key: number) {
  currentTopic.value = key;
}

onMounted(async () => {
  topics.value = await api.get<IBasedResponse<Array<IDisciplineTopic>>>(`/getTopics?discipline=${route.params.id}`)
    .then((res) => res.data.Data.sort((a, b) => a.Number - b.Number));
    
  const file = await FileService.getFile(topics.value?.[0].File_Link, 'application/pdf')
  const url = URL.createObjectURL(file)
  pdfSrc.value = url;
  console.log(url)
  const loadingTask = createLoadingTask(pdfSrc.value);
  loadingTask.promise.then((pdf: PDFDocumentProxy) => {
    numOfPages.value = pdf.numPages;
  });
});
</script>

<style lang="scss" scoped>
.course {
  display: flex;
  align-items: flex-start;

  &__wrapper {
    width: 100%;

    .vue-pdf-main {
      min-height: 100vh;

      :deep(.canvas) {
        height: 100vh !important;
      }
    }
  }
}
</style>
