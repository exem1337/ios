<template>
  <div class="courses">
    <div class="container">
      <div class="courses__wrapper">
        <q-item
          v-for="(course, key) in courses"
          :key="key"
          class="courses__wrapper--item bg-amber-1 shadow-2"
          :to="`courses/${course?.id}`"
        >
          <p class="courses__wrapper--item__heading">{{ course?.name }}</p>
          <p class="courses__wrapper--item__description">
            {{ course?.description }}
          </p>
          <q-btn @click="onGoToEdit(course?.id)">Редактировать Курс</q-btn>
        </q-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ICourse } from 'src/models/course.model';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const courses = ref<Array<ICourse>>([
  {
    name: 'Основы программирования на языке C++',
    id: 0,
    description: 'Курс основ программирования на языке C++',
  },
  {
    name: 'Основы программирования на языке C++',
    id: 0,
    description: 'Курс основ программирования на языке C++',
  },
  {
    name: 'Основы программирования на языке C++',
    id: 0,
    description: 'Курс основ программирования на языке C++',
  },
  {
    name: 'Основы программирования на языке C++',
    id: 0,
    description: 'Курс основ программирования на языке C++',
  },
  {
    name: 'Основы программирования на языке C++',
    id: 0,
    description: 'Курс основ программирования на языке C++',
  },
  {
    name: 'Основы программирования на языке C++',
    id: 0,
    description: 'Курс основ программирования на языке C++',
  },
  {
    name: 'Основы программирования на языке C++',
    id: 0,
    description: 'Курс основ программирования на языке C++',
  },
  {
    name: 'Основы программирования на языке C++',
    id: 0,
    description: 'Курс основ программирования на языке C++',
  },
]);
const router = useRouter();

const onGoToEdit = (id: number) => {
  router.replace(`/courses/${id}/edit`);
};
</script>

<style lang="scss" scoped>
@import 'assets/styles/variables.scss';

.courses__wrapper {
  margin-top: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;

  &--item {
    width: 48%;
    height: fit-content;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 8px;
    transition: $transition;
    min-height: 120px;

    &__heading {
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 12px;
    }

    &__description {
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 0;
    }

    &:hover {
      background: #ffecb3 !important;
    }
  }
}
</style>
