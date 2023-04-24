<template>
  <q-card class="test-item">
    <q-btn 
      class="test-item--delete"
      color="primary"
      @click="onDeleteQuestion"
    >
      Удалить вопрос
    </q-btn>

    <q-uploader 
      label="Картинка вопроса (опционально)"
      send-raw
      @added="onAddQuestionImage"
      @removed="onRemoveQuestionImage"
      ref="fileUploaderRef"
      accept=".png, image/*"
      max-files="1"
    />

    <q-input 
      label="Текст вопроса"
      v-model="questionName"
      outlined
      type="textarea"
    />
      
    <div
      v-for="answer in clonedQuestion?.Answer"
      :key="answer.Key" 
      class="answers"
    >
      <div class="answers__answer">
        <q-input 
          label="Текст ответа"
          v-model="answer.Text"
          @update:model-value="onUpdateAnswer.bind($event, answer).call()"
        /> 
        
        <div class="answers__answer--actions">
          <q-radio
            v-model="selectedAnswerKey"
            :val="answer.Key"
          >
            Правильный ответ
          </q-radio>
          <AppImageUploader
            :file="answer.Img?.File"
            :model="answer"
            @add="onAddAnswerImage"
            @remove="onRemoveAnswerImage"  
          />
          <q-icon 
            color="red-7"
            name="cancel"
            @click="onDeleteClick(answer)"
          />
        </div>
      </div>
    </div>
    <q-btn
      color="primary"
      @click="onAnswerCreate"
    >
      Создать ответ
    </q-btn>
  </q-card>
</template>
<script lang="ts" setup>
import { ITestQuestion, ITestQuestionAnswer, ITestQuestionUpdate, ITestAnswerUpdate, IUpdateImage } from 'src/models/test.model';
import { onBeforeMount, ref, watch, nextTick } from 'vue';
import { cloneDeep, indexOf } from 'lodash-es';
import { FileService } from 'src/services/file.service';
import AppImageUploader from 'components/AppImageUploader.vue';

const props = defineProps<{
  question: ITestQuestion;
  preventUpdate: boolean;
}>();

const emits = defineEmits<{
  (e: 'onDelete', value: number): void;
  (e: 'updateQuestionName', value: ITestQuestionUpdate): void;
  (e: 'updateAnswer', value: ITestAnswerUpdate): void;
  (e: 'onAddAnswer', value: ITestAnswerUpdate): void;
  (e: 'updateQuestionImage', value: IUpdateImage): void;
  (e: 'deleteQuestion', value: number): void;
}>();

const questionName = ref(props.question.Header);
const clonedQuestion = ref<ITestQuestion>(cloneDeep(props.question));
const selectedAnswerKey = ref();
const fileUploaderRef = ref();
const isPreventUploadFiles = ref(true);

function onDeleteQuestion() {
  emits('deleteQuestion', props.question.Key ?? 0);
}

async function onAddQuestionImage(file: Array<File>) {
  if (isPreventUploadFiles.value) {
    return;
  }
  
  const salt = await FileService.uploadFile(file);
  
  emits('updateQuestionImage', {
    key: Number(props.question.Key),
    fileKey: salt,
    header: questionName.value,
    isNew: props.question.isNew,
  })
}

function onRemoveQuestionImage() {
  emits('updateQuestionImage', {
    key: Number(props.question.Key),
    fileKey: 'NULL',
    header: questionName.value,
    isNew: props.question.isNew,
  })
}

function onAddAnswerImage(event) {
  emits('updateAnswer', {
    text: event.model.Text,
    key: event.model.Key,
    isCorrect: event.model.IsCorrect,
    isNew: event.model.isNew,
    fileKey: event.fileKey,
  })
}

function onRemoveAnswerImage(event) {
  emits('updateAnswer', {
    text: event.model.Text,
    key: event.model.Key,
    isCorrect: event.model.IsCorrect,
    isNew: event.model.isNew,
    fileKey: event.fileKey,
  })
}

function onChangeCorrectivity(newCorrect: number, oldCorrect: number) {
  const foundNewCorrectQuestion = clonedQuestion.value?.Answer?.find((ans) => ans.Key === newCorrect);

  if (!foundNewCorrectQuestion) {
    return;
  }

  foundNewCorrectQuestion.IsCorrect = 1;
  const foundOldCorrectQuestion = clonedQuestion.value?.Answer?.find((ans) => ans.Key === oldCorrect);

  if (!foundOldCorrectQuestion) {
    return;
  }

  foundOldCorrectQuestion.IsCorrect = 0;
  onUpdateAnswer(foundNewCorrectQuestion);
  onUpdateAnswer(foundOldCorrectQuestion);
}

function onDeleteClick(answer: ITestQuestionAnswer) {
  clonedQuestion.value?.Answer?.splice(
    indexOf(clonedQuestion.value?.Answer, answer),
    1
  );

  if (!answer.isNew) {
    emits('onDelete', answer.Key);
  }
}

function onUpdateAnswer(event: ITestQuestionAnswer) {
  if (props.preventUpdate) {
    return;
  }

  emits('updateAnswer', {
    text: event.Text,
    key: event.Key,
    isCorrect: event.IsCorrect,
    isNew: event.isNew,
  })
}

function onQuestionNameChange() {
  if (props.preventUpdate) {
    return;
  }
  
  emits('updateQuestionName', {
    header: questionName.value,
    key: props.question.Key,
    isNew: props.question.isNew,
  });
}

function onAnswerCreate() {
  const answer = {
    Name: '',
    Key: Math.random(),
    IsCorrect: false,
    isNew: true
  }

  clonedQuestion.value.Answer.push(answer);

  emits('onAddAnswer', {
    questionKey: props.question.Key,
    answer,
    key: answer.Key,
  })
}

watch(
  () => questionName.value,
  () => (onQuestionNameChange()),
)

watch(
  () => selectedAnswerKey.value,
  (newValue, oldValue) => (onChangeCorrectivity(newValue, oldValue)),
)

onBeforeMount(async () => {
  if (props.question.Img?.File) {
    const file = await FileService.getFile(props.question.Img.File);
    fileUploaderRef.value.addFiles([file]);
  }
  
  const selectedAnswer = props.question.Answer?.find((ans) => ans.IsCorrect) || props.question.Answer?.[0];
  selectedAnswerKey.value = selectedAnswer?.Key;

  emits('updateAnswer', {
    text: selectedAnswer.Text,
    key: selectedAnswer.Key,
    isCorrect: 1,
    isNew: selectedAnswer.isNew,
  })

  nextTick(() => (isPreventUploadFiles.value = false));
})
</script>

<style lang="scss" scoped>
.test-item {
  padding: 20px;
  position: relative;
  
  &--delete {
    position: absolute;
    top: 8px;
    right: 8px;
  }

  .q-btn {
    margin-top: 8px;
  }

  .answers {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
   
    &__answer {
      display: flex;
      align-items: flex-start;
   
      .q-input {
        width: 80%;
      } 
   
      &--actions {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding-top: 16px;

        .q-icon {
          margin-left: 8px;
          font-size: 24px;
          cursor: pointer;
        }
      }
    }
  }
  
  &:not(:last-child) {
    margin-bottom: 8px;
  }
}
</style>