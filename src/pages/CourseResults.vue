<template>
  <div class="course-results">
    <h4>Результаты обучающихся по дисциплине</h4>

    <div class="course-results__wrapper">
      <q-table
        class="my-sticky-header-table"
        flat bordered
        title="Результаты"
        :rows="results"
        :columns="COURSE_RESULT_COLUMNS"
        row-key="name"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from 'src/boot/axios';
import { COURSE_RESULT_COLUMNS } from 'src/constants/courseResultsColumns.const';
import { ICourseResult } from 'src/models/course.model';
import { AuthManager } from 'src/services/auth.service';
import { RouterGuardManager } from 'src/utils/routerGuard.util';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const results = ref<Array<ICourseResult>>();
const router = useRouter();

onBeforeMount(async () => {
  await AuthManager.refresh(router);
  RouterGuardManager.useAuthGuard(router, route);
  results.value = await api.get(`/getDisciplineResults/${route.params.id}`).then((res) => res.data.Data?.map((el) => ({
    ...el,
    fio: `${el.Surname} ${el.Name} ${el.Patronymic}`
  })));
})
</script>

<style lang="scss" scoped>
.course-results {
  max-width: 80vw;
  margin: 0 auto;
  margin-bottom: 24px;

  :deep(.q-table__bottom) {
    display: none;
  }

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