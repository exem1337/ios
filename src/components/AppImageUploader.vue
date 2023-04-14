<template>
  <q-uploader 
    :label="label ?? 'Картинка ответа (опционально)'"
    send-raw
    ref="uploaderRef"
    @added="onAddImage"
    @removed="onRemoveImage"
    :accept="accept ?? '.png, image/*'"
    max-files="1"
  />
</template>

<script lang="ts" setup>
import { IAddImage } from 'src/models/test.model';
import { FileService } from 'src/services/file.service';
import { onBeforeMount, ref } from 'vue';

const props = defineProps<{
  file?: string;
  label?: string;
  accept?: string;
  model?: any;
  type?: string;
}>();

const emits = defineEmits<{
  (e: 'remove', value: IAddImage): void;
  (e: 'add', value: IAddImage): void;
}>()

const uploaderRef = ref();
const prevent = ref(true);

async function onAddImage(file: Array<File>) {  
  if (prevent.value) {
    return;
  }

  const salt = await FileService.uploadFile(file);
  emits('add', {
    model: props.model,
    fileKey: salt,
  });
}

function onRemoveImage() {
  emits('remove', {
    model: props.model,
    fileKey: 'NULL',
  });
}

onBeforeMount(async () => {
  if (props.file) {
    const file = await FileService.getFile(props.file, props.type);
    console.log(file)

    if (!file) {
      return;
    }
    uploaderRef.value.addFiles([file]);
  }

  prevent.value = false;
})
</script>

<style lang="scss" scoped>
.q-uploader {
  :deep(.q-uploader__file-header-content) {
    color: #3e2723 !important;
  }

  :deep(.q-uploader__file-header) {
    .q-btn {
      color: #3e2723 !important;
    }
  }
}
</style>