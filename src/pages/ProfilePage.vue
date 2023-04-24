<template>
  <div class="container">
    <h4>Профиль</h4>
    <q-card 
      class="profile"
    >
      <span class="profile--header">ФИО: {{ store.getUser.name }}</span> <br>
      <span class="profile--header">Роль: {{ store.isExpert ? 'Эксперт' : 'Студент' }}</span>

      <div class="profile--disciplines">
        <p>Список дисциплин</p>
        <div 
          v-for="disc in disciplines"
          :key="disc.Key"
          class="profile--disciplines__item"
        >
          <span>{{ disc.Name }}</span> 
          <div v-if="!store.isExpert && disc.status">
            <span>Статус: {{ disc.status.Status }} (Дата получения: {{ new Date(disc.status.DateGot).toLocaleDateString('ru-RU') }})</span>
            <span>Результатирующие данные: Среднее время ответа на вопрос {{ disc.status.Answer_Time }}, Процент правильности ответов: {{ disc.status.Correct_Percentage }}, Сложность теста: {{ disc.status.Test_Difficulty }}, Время изучения материала: {{ TestService.getEduTimeDelta([{Time: disc.status.Topic_Time}]) }}</span>
          </div>
          <span v-else-if="!store.isExpert && !disc.status">Статус: не определен</span>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { api } from 'src/boot/axios';
import { IDiscipline } from 'src/models/course.model';
import { AuthManager } from 'src/services/auth.service';
import { TestService } from 'src/services/test.service';
import { useUserStore } from 'src/stores/userStore';
import { RouterGuardManager } from 'src/utils/routerGuard.util';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const store = useUserStore();
const disciplines = ref<Array<IDiscipline>>();
const router = useRouter();
const route = useRoute();

onBeforeMount(async () => {
  await AuthManager.refresh(router);
  RouterGuardManager.useAuthGuard(router, route);
  
  disciplines.value = await api.get('/getMyDisciplines').then((res) => res.data.Data);

  if (store.isExpert) {
    return;
  }

  disciplines.value = await Promise.all(disciplines.value?.map(async (disc) => ({
    ...disc,
    status: await api.get(`/getStoredStatusIos?physKey=${store.getUser.id}&disciplineKey=${disc.Key}&last=true`).then((res) => res.data.Data),
  })))
})
</script>

<style lang="scss" scoped>
.container {
  h4 {
    font-size: 24px;
    height: fit-content;  
    width: fit-content;
    margin: 0 auto;
    color: #616161;
    margin-bottom: 16px;
  }

  .profile {
    margin-bottom: 16px;
    padding: 24px;
  
    &--header {
      font-size: 16px;
      font-weight: 500;
    }

    &--disciplines {
      margin-top: 16px;

      span {
        font-size: 16px;
        font-weight: 500;
      }

      p {
        color: $primary;
        font-size: 16px;
        font-weight: 700;
      }

      display: flex;
      flex-direction: column;
      gap: 8px;

      &__item {
        width: 100%;
        background-color: $secondary;
        color: $primary;
        font-weight: 500;
        padding: 16px;
        border-radius: 4px;

        display: flex;
        flex-direction: column;

        div {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
}
</style>
