<template>
  <q-dialog 
    v-model="isShowModal"
    @hide="$emit('close')"
  >
    <q-card>
      <q-icon
        v-if="!options.hideClose" 
        name="close" 
        @click="$emit('close')"
      />
      <p 
        v-if="!options.hideHeader"
        class="modal-header"
      >
        {{ options.headerText ?? 'Заголовок' }}
      </p>

      <component
        v-if="options.component" 
        :is="options.component"
        v-model="componentModelValue"
        @valid="isValid = $event"
      />
      <slot name="content" />

      <div
        v-if="!options.hideFooter"
        class="modal-footer"
      >
        <q-btn 
          color="secondary"
          :disable="!isValid"
          @click="onOkClick"
        >
          {{ options.okButtonText ?? 'ОК' }}
        </q-btn>
      </div>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { IModalProps } from 'src/models/modal.model';
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: boolean;
  options: IModalProps;
}>();

const emits = defineEmits<{
  (e: 'close'): void;
  (e: 'ok', value: any): void;
}>()

const isShowModal = ref();
const componentModelValue = ref<any>(props.options.componentModelValue);
const isValid = ref(false);

function onOkClick() {
  emits('ok', componentModelValue);
}

watch(
  () => props.modelValue,
  (newValue: boolean) => (isShowModal.value = newValue),
)
</script>

<style lang="scss" scoped>
.q-card {
  padding: 20px;
  position: relative;

  .q-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 24px;
    cursor: pointer;
  }

  .modal-header {
    font-size: 24px;
    line-height: 36px;
  }

  .modal-footer {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>