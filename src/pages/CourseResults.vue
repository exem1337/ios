<template>
  <div class="course-results">
    <h4>Результаты обучающихся по дисциплине</h4>

    <div class="course-results__wrapper">
      <q-card
        v-for="(result, key) in results"
        :key="key" 
        class="course-results__wrapper--result"
      >
        <p>Название теста: <span>{{ result.TestName }}</span></p> 
        <p>Сложность: <span>{{ result.Difficulty }}</span></p> 
        <p>ФИО: <span>{{ result.Surname }} {{ result.Name }} {{ result.Patronymic }}</span></p>
        <p>Дата прохождения: <span>{{ new Date(result.Date_Submitted).toLocaleDateString('ru-RU') }}</span></p>
        <p>Результат: <span>{{ result.Result }}</span></p>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from 'src/boot/axios';
import { ICourseResult } from 'src/models/course.model';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const results = ref<Array<ICourseResult>>();

onBeforeMount(async () => {
  results.value = await api.get(`/getDisciplineResults/${route.params.id}`).then((res) => res.data.Data);
})
</script>

<style lang="scss" scoped>
.course-results {
  max-width: 80vw;
  margin: 0 auto;

  h4 {
    font-size: 24px;
    height: fit-content;  
    width: fit-content;
    margin: 0 auto;
    color: #616161;
    margin-bottom: 16px;
  }

  &__wrapper {
    display: flex;
    gap: 16px;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;

    &--result {
      padding: 8px;
      width: fit-content;
      font-weight: 500;

      p {
        color: $primary;
        font-weight: 700;
        margin-bottom: 8px;

        &:last-child {
          margin-bottom: 0;
        }

        span {
          color: black;
          font-weight: 500;
        }
      }
    }
  }
}
</style>