<template>
  <q-uploader 
    label="Материал темы"
    send-raw
    ref="uploaderRef"
    color="primary"
    @added="onAddFile"
    @removed="onRemoveFile"
    accept=".pdf, file/*"
    max-files="1"
  />
</template>

<script lang="ts" setup>
import { FileService } from 'src/services/file.service';
import { onBeforeMount, ref } from 'vue';

const props = defineProps<{
  modelValue?: string;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: string | null): void;
  (e: 'valid', value: boolean): void;
}>()

const uploaderRef = ref();

async function onAddFile(file: Array<File>) {  
  const salt = await FileService.uploadFile(file);
  emits('update:modelValue', salt);
}

function onRemoveFile() {
  emits('update:modelValue', 'NULL');
}

onBeforeMount(async () => {
  if (props.modelValue) {
    const file = await FileService.getFile(props.modelValue);
    uploaderRef.value.addFiles([file]);
  }
  emits('valid', true);
})
</script>
