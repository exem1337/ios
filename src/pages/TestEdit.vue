<template>
  <div class="test-edit container">
    <h6>Тестовый материал для темы 0</h6>

    <q-card v-if="!test?.questions?.length">
      <p>К этой теме не добавлен тест</p>
      <q-btn @click="onCreateTest">Создать тест</q-btn>
    </q-card>

    <AppTestTemplate :questions="test?.questions" />
  </div>
</template>

<script lang="ts" setup>
import { ITest } from 'src/models/test.model';
import { ref } from 'vue';
import AppTestTemplate from 'components/tests/AppTestTemplate.vue';

const test = ref<ITest>();

const onCreateTest = () => {
  test.value?.questions.push({
    title: '',
    id: 0,
    answers: [],
  });
};
</script>

<style lang="scss" scoped>
.test-edit {
  margin-top: 50px;
}
</style>
