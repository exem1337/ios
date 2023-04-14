<template>
  <div class="test-wrapper">
    <div v-if="!isTestStarted" class="test-wrapper__empty">
      <div>
        <h4>Тестирование блаблабла</h4>
        <p>Сложность Низкий</p>
      </div>
      <q-btn @click="onStartTest">Начать тестирование</q-btn>
    </div>

    <div v-else>
      <AppTest :test="test" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ITest } from 'src/models/test.model';
import { ref } from 'vue';
// import { useRoute } from 'vue-router';
import AppTest from 'src/components/tests/AppTest.vue';

// const route = useRoute();
const isTestStarted = ref(false);

const test = ref<ITest>({
  id: 0,
  questions: [
    {
      id: 0,
      title: 'Где правильно указана переменная?',
      answers: [
        {
          id: 0,
          text: `char sym = 'a';`,
          isCorrect: true,
        },
        {
          id: 1,
          text: 'var str = "Hi";',
          isCorrect: false,
        },
        {
          id: 2,
          text: 'int num = "1";',
          isCorrect: false,
        },
        {
          id: 3,
          text: 'float x = 32,14;',
          isCorrect: false,
        },
      ],
    },
    {
      id: 1,
      title: 'второй вопрос',
      answers: [
        {
          id: 0,
          text: 'первый ответ',
          isCorrect: true,
        },
        {
          id: 1,
          text: 'второй ответ',
          isCorrect: false,
        },
        {
          id: 2,
          text: 'третий ответ',
          isCorrect: false,
        },
        {
          id: 3,
          text: 'четвертый ответ',
          isCorrect: false,
        },
      ],
    },
    {
      id: 2,
      title: 'третий вопрос',
      answers: [
        {
          id: 0,
          text: 'первый ответ',
          isCorrect: true,
        },
        {
          id: 1,
          text: 'второй ответ',
          isCorrect: false,
        },
        {
          id: 2,
          text: 'третий ответ',
          isCorrect: false,
        },
        {
          id: 3,
          text: 'четвертый ответ',
          isCorrect: false,
        },
      ],
    },
    {
      id: 3,
      title: 'четвертый вопрос',
      answers: [
        {
          id: 0,
          text: 'первый ответ',
          isCorrect: true,
        },
        {
          id: 1,
          text: 'второй ответ',
          isCorrect: false,
        },
        {
          id: 2,
          text: 'третий ответ',
          isCorrect: false,
        },
        {
          id: 3,
          text: 'четвертый ответ',
          isCorrect: false,
        },
      ],
    },
  ],
});

const startTimer = () => {
  //
};

const onStartTest = () => {
  isTestStarted.value = true;
  startTimer();
};
</script>

<style lang="scss" scoped></style>
