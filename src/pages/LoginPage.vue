<template>
  <q-page>
    <div class="container mt-med">
      <div class="login-page">
        <q-card>
          <q-card-section><h6>Войти в систему</h6></q-card-section>
          <q-form @submit.prevent="onSubmit" ref="myForm">
            <q-input
              ref="surnameRef"
              filled
              v-model="email"
              label="Электронная почта"
              type="email"
              clearable
              :rules="[(val) => val?.length > 0 || 'Обязательное поле']"
            />
            <q-input
              ref="nameRef"
              filled
              v-model="password"
              label="Пароль"
              clearable
              type="password"
              :rules="[
                (val) => val?.length > 0 || 'Обязательное поле',
                (val) =>
                  new RegExp(/^[A-Za-zА-Яа-я]+$/).test(val) ||
                  'Недопустимый формат',
              ]"
            />
            <q-btn type="submit">Войти</q-btn>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useMeta } from 'quasar';
import { AuthManager } from 'src/services/auth.service';

import { ref } from 'vue';

const email = ref();
const password = ref();

const meta = {
  title: 'Войти в систму',
};

useMeta(meta);

const onSubmit = async () => {
  await AuthManager.login();
};
</script>

<style lang="scss" scoped>
@import 'assets/styles/variables.scss';

.container {
  .login-page {
    display: flex;
    align-items: flex-start;
    justify-content: center;

    .q-card {
      width: 100%;
      max-width: 500px;
      padding: 14px;
      position: relative;

      &__section {
        h6 {
          margin: 0;
        }
      }

      .q-btn {
      }
    }
  }

  .mt-small {
    text-align: right;

    span {
      color: $main-amber;
      font-weight: 500;
      cursor: pointer;
    }
  }
}
</style>
