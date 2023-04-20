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
        >
          <div @click="onGoToCourse(course.Key)">
            <p class="courses__wrapper--item__heading">{{ course?.Name }}</p>
            <p class="courses__wrapper--item__description">
              {{ course?.ShName }}
            </p>
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
import { useRouter } from 'vue-router';
import AppLoader from 'components/AppLoader.vue';

const disciplines = ref<Array<ICourse>>();
const router = useRouter();
const store = useUserStore();
const isDataLoading = ref(true);
const newDisciplineName = ref();
const newDisciplineDesc = ref();

function onGoToEdit(id: number) {
  router.push(`/courses/${id}/edit`);
};

function onGoToResults(id: number) {
  router.push(`/courses/${id}/results`);
};

function onGoToCourse(id: number) {
  router.push(`/courses/${id}`);
}

async function loadData() {
  isDataLoading.value = true;
  disciplines.value = await api.get('/getMyDisciplines').then((res) => res.data.Data);
  newDisciplineDesc.value = '';
  newDisciplineName.value = '';
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
