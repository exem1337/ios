<template>
  <q-page>
    <div class="container mt-med">
      <div class="login-page">
        <sign-in-student
          :class="{ 'not-active': isActiveLoginExpert }"
          @click="isActiveLoginExpert = false"
        />
        <sign-in-expert
          :class="{ 'not-active': !isActiveLoginExpert }"
          @click="isActiveLoginExpert = true"
        />
      </div>
      <p class="mt-small">Уже есть аккаунт? <span>войти в систму</span></p>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useMeta } from 'quasar';
import { ref } from 'vue';
import SignInStudent from 'components/auth/SignInStudent.vue';
import SignInExpert from 'components/auth/SignInExpert.vue';

const isActiveLoginExpert = ref(false);

const meta = {
  title: 'Войти в систму',
};

useMeta(meta);
</script>

<style lang="scss" scoped>
@import 'assets/styles/variables.scss';

.container {
  .login-page {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .q-card {
      width: 49%;
      transition: $transition;
      &.not-active {
        filter: opacity(0.6);

        &:hover {
          filter: opacity(0.8);
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
