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
            />
            <div class="btn-wrapper">
              <q-btn 
                color="secondary"
                type="submit"
              >
                Войти
              </q-btn>
            </div>
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
import { useRouter } from 'vue-router';

const email = ref();
const password = ref();
const router = useRouter();

const meta = {
  title: 'Войти в систму',
};

useMeta(meta);

const onSubmit = async () => {
  await AuthManager.login(email.value, password.value, router);
};
</script>

<style lang="scss" scoped>
@import 'assets/styles/variables.scss';

:global(input:-internal-autofill-selected) {
  background-color: black !important;
}

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

      .btn-wrapper {
        width: 100%;
        display: flex;
        justify-content: flex-end;

        .q-btn {
          margin-top: 8px;
          
        }
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
