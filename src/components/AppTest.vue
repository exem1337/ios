<template>
  <div class="test">
    <q-card>
      <h4>{{ test.Name }}</h4>

      <div 
        class="test__question"
      >
        <div class="test__question--header">
          <p>Вопрос {{ currentQuestionKey + 1 }}</p>
          <p>{{ test.Questions?.[currentQuestionKey]?.Header }}</p>
  
          <img 
            v-if="test.Questions?.[currentQuestionKey]?.Img"
            :src="`data:image/png;base64,${test.Questions?.[currentQuestionKey]?.Img}`" 
            alt="картинка"
          >
        </div>

        <div 
          v-for="answer in test.Questions?.[currentQuestionKey]?.Answer" 
          :key="answer.Key"
          class="test__question--answer"
        >
          <q-radio  
            v-model="currentAnswer" 
            :val="answer.Key" 
            :label="answer.Text" 
          />

          <img
            v-if="answer.Img" 
            :src="`data:image/png;base64,${answer?.Img}`"
          />
        </div>
      </div>
      
      <q-btn 
        :disable="!currentAnswer"
        color="primary"
        @click="onAnswer"
      >
        Продолжить
      </q-btn>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { api } from 'src/boot/axios';
import { ITest } from 'src/models/test.model';
import { ref } from 'vue';

const props = defineProps<{
  test: ITest;
}>();

const emits = defineEmits<{
  (e: 'comleted', value: number): void;
}>()

const currentAnswer = ref();
const currentQuestionKey = ref(0);
const rightAnswers = ref(0);

async function onAnswer() {
  const result = await api.get(`/validateAnswer?questionKey=${props.test.Questions?.[currentQuestionKey.value].Key}&answerKey=${currentAnswer.value}`)
  .then((res) => res.data.Data.Correct);
  if (result) {
    rightAnswers.value++;
  }
  currentAnswer.value = null;
  if (currentQuestionKey.value + 1 === props.test.Questions?.length) {
    emits('comleted', rightAnswers.value);
  }
  currentQuestionKey.value++;
}
</script>

<style lang="scss" scoped>
.test {
  width: 100%;
  img {
    max-width: 400px;
    max-height: 400px;
    object-fit: contain;
  }
  .q-card {
    width: fit-content;
    min-width: 50vw;
    max-width: 80vw;
    margin: 0 auto;
    padding: 24px;
    margin-top: 20px;
    margin-bottom: 20px;
    position: relative;
    h4 {
      margin-top: 0;
      overflow-wrap: break-word;
    }
    .test__question {
      display: flex;
      flex-direction: column;
      margin-bottom: 24px;
      .q-radio {
        margin-left: -10px;
      }
    }
    .q-btn {
      position: absolute;
      bottom: 14px;
      right: 14px;
    }
  }
}
</style>