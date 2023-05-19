<template>
  <AppLoader v-if="isDataLoading" />
  <div
    v-else 
    class="operator"
  >
    <div class="operator--users">
      <div class="operator--users__header">
        <p>Пользователи</p>
      </div>
      <div
        v-for="user in users"
        :key="user.Key" 
        class="operator--users__user"
      >
        <span>{{ user.Surname }} {{ user.Name }} {{ user.Patronymic }}</span>
        <span>Роль: {{ user.Role_Name }}</span>
        <span>email: {{ user.Email }}</span>
        <span>Дата регистрации: {{ new Date(user.Reg_Date).toLocaleDateString('ru-RU') }}</span>
      </div>
    </div>
    <div class="operator--new">
      <div class="operator--new__header">
        <p>Создать пользователя</p>
      </div>
      <q-form 
        autocomplete="off"
        class="operator--new__user"
      >
        <q-input 
          type="email"
        
          v-model="newUser.email"
          label="Email"
        /> 
        <q-input 
          v-model="newUser.surname"
          label="Фамилия"
        /> 
        <q-input 
          v-model="newUser.name"
          label="Имя"
        /> 
        <q-input 
          v-model="newUser.patronymic"
          label="Отчество"
        /> 
        <q-select
          v-model="newUser.sex"
          label="Пол"
          :options="sexOptions"
        />
        <q-select
          v-model="newUser.role"
          label="Роль"
          :options="roles"
          :option-value="(option) => option.Key"
          :option-label="(option) => option.Name"
        />
        <q-input 
          type="password"
          label="Пароль"
          v-model="newUser.password"
        />
        <div class="button">
          <q-btn 
            label="Сохранить"
            color="secondary"
            :disable="isSaveButtonDisabled"
            @click="onUserCreate"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from 'src/boot/axios';
import { IBasedResponse } from 'src/models/api.model';
import { IUserRole } from 'src/models/user.model';
import { AuthManager } from 'src/services/auth.service';
import { RouterGuardManager } from 'src/utils/routerGuard.util';
import { computed, onBeforeMount, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppLoader from 'components/AppLoader.vue';
import { IAllUsersInfoItem } from 'src/models/auth.model';

const roles = ref<Array<IUserRole>>();
const users = ref<Array<IAllUsersInfoItem>>();
const router = useRouter();
const route = useRoute();
const isDataLoading = ref(false);
const newUser = reactive({
  email: '',
  patronymic: '',
  name: '',
  surname: '',
  sex: '',
  role: 0,
  password: '',
})
const sexOptions = ['Мужской', 'Женский'];
const isSaveButtonDisabled = computed(() => 
  !newUser.email || 
  !newUser.name || 
  !newUser.password || 
  !newUser.patronymic || 
  !newUser.role?.Key || 
  !newUser.sex || 
  !newUser.surname
);

async function onUserCreate() {
  await api.post('/newPhys', {
    Name: newUser.name,
    Surname: newUser.surname,
    Patronymic: newUser.patronymic,
    Email: newUser.email,
    Sex_Key: 1,
    Role_Key: newUser.role?.Key,
    Interface_Type: 1,
    Rating: 0,
    Login: '123',
    Password: newUser.password
  })
  await loadData();
}

async function loadData() {
  isDataLoading.value = true;
  roles.value = await api.get<IBasedResponse<Array<IUserRole>>>('/getRoles').then((res) => res.data.Data);
  users.value = await api.get<IBasedResponse<Array<IAllUsersInfoItem>>>('/getAllUsers').then((res) => res.data.Data);
  isDataLoading.value = false;
}

onBeforeMount(async () => {
  await AuthManager.refresh(router);
  RouterGuardManager.useAuthGuard(router, route);
  await loadData();
})
</script>

<style lang="scss" scoped>
.operator {
  max-width: 75vw;
  margin: 24px auto;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;

  &--new {
    width: 50%;
    box-shadow: $shadow;
    border-radius: 4px;
    padding: 8px;

    &__header {
      background-color: $primary;
      color: #fff;
      padding: 16px;
      margin-bottom: 8px;
      border-radius: 4px;

      p {
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        margin-bottom: 0;
      }
    }

    &__user {
      margin-left: 4px;
      margin-right: 4px;
      display: flex;
      flex-direction: column;
      gap: 16px;

      .button {
        width: 100%;
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  &--users {
    width: 50%;
    background-color: #fff;
    padding: 8px;
    border-radius: 4px;
    box-shadow: $shadow;

    &__header {
      background-color: $secondary;
      color: #fff;
      padding: 16px;
      margin-bottom: 8px;
      border-radius: 4px;

      p {
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        margin-bottom: 0;
      }
    }

    &__user {
      margin-left: 4px;
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
      gap: 4px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>