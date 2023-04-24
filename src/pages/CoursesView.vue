<template>
  <AppLoader v-if="isDataLoading" />
  <div
    v-else 
    class="courses"
  >
    <div class="container">
      <div class="courses__wrapper">
        <q-item
          v-for="(course, key) in disciplines"
          :key="key"
          class="courses__wrapper--item bg-amber-1 shadow-2"
          :class="{ 'disabled' : !store.isExpert && !course.status }"
        >
          <q-tooltip 
            v-if="!store.isExpert && !course.status"
            class="bg-brown-7"
          >
            Прежде чем начать просмотр дисциплины, получите ее статус
          </q-tooltip>
          <div @click="onGoToCourse(course)">
            <p class="courses__wrapper--item__heading">{{ course?.Name }}</p>
            <p class="courses__wrapper--item__description">
              {{ course?.ShName }}
            </p>
            <span v-if="!store.isExpert">Статус: {{ course.status?.Status || 'не определен' }}</span>
          </div>
          <q-btn
            v-if="store.isExpert"
            color="brown-8" 
            @click.stop="onGoToEdit(course?.Key)"
          >
            Редактировать
          </q-btn>
          <q-btn
            v-if="store.isExpert"
            color="brown-8" 
            @click.stop="onGoToResults(course?.Key)"
          >
            Результаты 
          </q-btn>
        </q-item>
        <q-item
          v-if="store.isExpert" 
          class="courses__wrapper--item bg-amber-1 shadow-2 new"
        >
          <div>
            <p class="courses__wrapper--item__heading">Новая дисциплина</p>
            <div class="courses__wrapper--item__description">
              <q-input 
                v-model="newDisciplineName"
                label="Название"
              />
              <q-input 
                v-model="newDisciplineDesc"
                label="Описание"
              />
              <q-btn
                color="primary"
                :disable="!newDisciplineDesc || !newDisciplineName"
                @click="onCreate"
              >
                Сохранить
              </q-btn> 
            </div>
          </div>
        </q-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from 'src/boot/axios';
import { ICourse } from 'src/models/course.model';
import { useUserStore } from 'src/stores/userStore';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppLoader from 'components/AppLoader.vue';
import { AuthManager } from 'src/services/auth.service';
import { RouterGuardManager } from 'src/utils/routerGuard.util';
import { Cookies } from 'quasar';

const disciplines = ref<Array<ICourse>>();
const router = useRouter();
const store = useUserStore();
const isDataLoading = ref(true);
const newDisciplineName = ref();
const newDisciplineDesc = ref();
const route = useRoute();

function onGoToEdit(id: number) {
  router.push(`/courses/${id}/edit`);
};

function onGoToResults(id: number) {
  router.push(`/courses/${id}/results`);
};

function onGoToCourse(discipline: ICourse) {
  if (store.isExpert || !discipline.status) {
    return;
  }

  router.push(`/courses/${discipline.Key}`);
}

async function loadData() {
  isDataLoading.value = true;
  disciplines.value = await api.get('/getMyDisciplines').then((res) => res.data.Data);
  newDisciplineDesc.value = '';
  newDisciplineName.value = '';

  if (store.isExpert) {
    isDataLoading.value = false;
    return;
  }

  disciplines.value = await Promise.all(disciplines.value?.map(async (disc) => {
    let status = await api.get(`/getStoredStatusIos?physKey=${store.getUser.id}&disciplineKey=${disc.Key}&last=true`).then((res) => res.data.Data);
    if (!status) {
      status = await api.get(`/getStoredStatus?physKey=${store.getUser.id}&disciplineKey=${disc.Key}&last=true`).then((res) => res.data.Data);
    }

    return {
      ...disc,
      status,
    }
  }))

  isDataLoading.value = false;
}

async function onCreate() {
  await api.post('/postDiscipline', {
    Name: newDisciplineName.value,
    ShName: newDisciplineDesc.value
  })
  await loadData();
}

onBeforeMount(async () => {
  await AuthManager.refresh(router);
  RouterGuardManager.useAuthGuard(router, route);
  await loadData();
})
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
    position: relative;
    width: 48%;
    height: fit-content;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 8px;
    transition: $transition;
    min-height: 120px;
    cursor: pointer;

    > div {
      width: 100%;
    }

    &.new {
      > div {
        width: 70%;
      }

      background-color: #fff !important;

      &:hover {
        background: #fff !important;
      }

      &__description {
        width: 100%;

        .q-input {
          width: 100%;
        }
      }
    }

    &__heading {
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 12px;
      max-width: 75%;
    }

    &__description {
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 0;
    }

    &:hover {
      background: #ffecb3 !important;
    }

    .q-btn {
      position: absolute;
      top: 8px;
      right: 8px;

      &:last-child {
        top: unset;
        bottom: 8px;
      }
    }
  }
}
</style>
