<template>
  <div class="users-wrapper">
    <q-card class="course-users">
      <p class="course-users__header">Пользователи дисциплины</p>
      <div
        v-for="user in users"
        :key="user.Key" 
        class="course-users__user"
      >
        <span>{{ user.Surname }} {{ user.Name }} {{ user.Patronymic }}</span>
        <span>({{ user.Role_Name }})</span>
        <span v-if="user.Key === store.getUser.id">(вы)</span>
      </div>
      <p v-if="!users || users.length === 1">нет пользователей, имеющих доступ к данной дисциплине</p>
    </q-card>
    <q-card class="course-users">
      <p class="course-users__header">Все студенты</p>
      <div
        v-for="user in allUsers"
        :key="user.Key" 
        class="course-users__user"
      >
        <span>{{ user.Surname }} {{ user.Name }} {{ user.Patronymic }}</span>
        <span>({{ user.Role_Name }})</span>
        <span v-if="user.Key === store.getUser.id">(вы)</span>
        <q-btn 
          round 
          color="secondary"
          icon="add"
          @click="onAddToDiscipline(user.Key)"
        />
      </div>
      <p v-if="!users || users.length === 1">нет пользователей, имеющих доступ к данной дисциплине</p>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { api } from 'src/boot/axios';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { IDisciplineUser } from '../models/course.model';
import { useUserStore } from 'src/stores/userStore';

const route = useRoute();
const users = ref<Array<IDisciplineUser>>();
const store = useUserStore();
const allUsers = ref();
const roles = ref();

async function onAddToDiscipline(key: number) {
  await api.post('/connectUserDiscipline', {
    phys_key: key,
    discipline_key: Number(route.params.id),
  })
}

onBeforeMount(async () => {
  // await api.post('/newPhys', {
  //   Name: 'Кефтеме',
  //   Surname: 'Бельчонков',
  //   Patronymic: 'Дмитриевна',
  //   Email: 'kefteme@mail.ru',
  //   Sex_Key: 1,
  //   Role_Key: 1,
  //   Interface_Type: 0,
  //   Rating: '',
  //   Login: 'kefteme@mail.ru',
  //   Password: '12345'
  // })
  
  users.value = await api.get(`/getDisciplineUsers/${route.params.id}`).then((res) => res.data.Data)
  allUsers.value = await api.get('/getAllUsers').then((res) => res.data.Data.filter((user) => !users.value?.find((us) => us.Key === user.Key)));
})
</script>

<style lang="scss" scoped>
.users-wrapper {
  min-height: 50vh;
  
  .course-users {
    max-width: 70vw;
    margin: 0 auto;
    margin-top: 24px;
    padding: 16px;
    max-height: 40vh;
    overflow-y: scroll;

    &__header {
      font-weight: 500;
      font-size: 24px;
      margin-bottom: 16px;
    }
  
    &__user {
      display: flex;
      gap: 8px;

      &:not(:first-child) {
        margin-top: 16px;
      }

      &:has(.q-btn) {
        align-items: center;

        .q-btn {
          margin-left: auto;
        }
      }
    }
  }
}
</style>