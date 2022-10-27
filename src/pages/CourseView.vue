<template>
  <div class="course">
    <q-tree :nodes="simple" node-key="label" />
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

const pdfSrc = ref<VuePdfPropsType['src']>(
  'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
);
const numOfPages = ref(0);

const simple = [
  {
    label: 'Satisfied customers (with avatar)',
    avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
    children: [
      {
        label: 'Good food (with icon)',
        icon: 'restaurant_menu',
        children: [{ label: 'Quality ingredients' }, { label: 'Good recipe' }],
      },
      {
        label: 'Good service (disabled node with icon)',
        icon: 'room_service',
        disabled: true,
        children: [
          { label: 'Prompt attention' },
          { label: 'Professional waiter' },
        ],
      },
      {
        label: 'Pleasant surroundings (with icon)',
        icon: 'photo',
        children: [
          {
            label: 'Happy atmosphere (with image)',
            img: 'https://cdn.quasar.dev/img/logo_calendar_128px.png',
          },
          { label: 'Good table presentation' },
          { label: 'Pleasing decor' },
        ],
      },
    ],
  },
];

onMounted(() => {
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
