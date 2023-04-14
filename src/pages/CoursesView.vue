<template>
  <div class="courses">
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
        </q-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Cookies } from 'quasar';
import { api } from 'src/boot/axios';
import { ICourse } from 'src/models/course.model';
import { useUserStore } from 'src/stores/userStore';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const disciplines = ref<Array<ICourse>>();
const router = useRouter();
const store = useUserStore();

function onGoToEdit(id: number) {
  router.push(`/courses/${id}/edit`);
};

function onGoToCourse(id: number) {
  router.push(`/courses/${id}`);
}

onBeforeMount(async () => {
  disciplines.value = await api.get('/getMyDisciplines', {
    headers: {
      userkey: Cookies.get('UserKey'),
    }
  }).then((res) => res.data.Data);
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
    }
  }
}
</style>
