<template>
  <div class="fuzzy-rules">
    <h4>Результаты подбора</h4>
    <p v-for="(a, key) in arr" :key="key">{{ a }}</p>
    <!-- <div
      v-for="(rule, key) in FUZZY_RULES"
      :key="key"
      class="fuzzy-rules__rule"
    >
      <span>ЕСЛИ</span>
      <p>
        {{ rule.statements[0].name }} {{ rule.statements[0].fuzzyName }}
        {{ rule.statements[0].accuracy ?? '' }}
      </p>
      <span>И </span>
      <p>
        {{ rule.statements[1].name }} {{ rule.statements[2].fuzzyName }}
        {{ rule.statements[1].accuracy ?? '' }}
      </p>
      <p>
        {{ rule.statements[2].name }} {{ rule.statements[2].fuzzyName }}
        {{ rule.statements[2].accuracy ?? '' }}
      </p>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
// import { FUZZY_RULES } from 'src/constants/fuzzyRules.const';

import { Cookies } from 'quasar';
import { api } from 'src/boot/axios';
import { RouterGuard } from 'src/services/routerGuard.service';
import { onMounted } from 'vue';
import EncryptService from '../services/encrypt.service';

const arr = [
  '12.09.2022, Степанова Ирина Васильевна, Среднее время тестирования - БЫСТРО, Статус обучаемого - ЭКСПЕРТ, Процент правильности ответов - АБСОЛЮТНО ПРАВИЛЬНО, Результат: Эксперт',
  '12.09.2022, Иванов Олег Евгеньевич, Среднее время тестирования - МЕДЛЕННО, Статус обучаемого - НОВИЧОК, Процент правильности ответов - ПОЧТИ НЕПРАВИЛЬНО, Результат: Новичок',
  '12.09.2022, Никонов Иван Александрович, Среднее время тестирования - СРЕДНЕЕ, Статус обучаемого - МАСТЕР, Процент правильности ответов - АБСОЛЮТНО ПРАВИЛЬНО, Результат: ПРОФЕССИОНАЛ',
  '12.09.2022, Толстых Александра Дмитриевна, Среднее время тестирования - БЫСТРО, Статус обучаемого - СТУДЕНТ, Процент правильности ответов - ПОЧТИ ПРАВИЛЬНО, Результат: МАСТЕР',
  '12.09.2022, Третяк Сергей Александрович, Среднее время тестирования - МЕДЛЕННО, Статус обучаемого - ПРОФЕССИОНАЛ, Процент правильности ответов - ПОЧТИ НЕПРАВИЛЬНО, Результат: МАСТЕР',
];

async function chapGet() {
  const salt = Cookies.get('salt');
  const N = Cookies.get('N');
  const userkey = Cookies.get('userKey');

  const sas = await api.get('/getRuleList', {
    headers: {
      Authorization: (salt + N).toString(),
      userkey,
    },
  });

  console.log(sas?.data);
}

async function jwtGet() {
  const token = Cookies.get('token');
  const verify = Cookies.get('verify');
  const userkey = Cookies.get('userkey');

  const sas = await api.get('/getRuleList', {
    headers: {
      token,
      verify,
      userkey,
    },
  });

  console.log(sas?.data);
}

onMounted(async () => {
  RouterGuard.checkExpert();
  await chapGet();
});
</script>

<style lang="scss" scoped>
.fuzzy-rules {
  &__rule {
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    padding: 10px;

    p {
      margin-right: 14px;
      margin-bottom: 0;
    }

    span {
      margin-right: 14px;
    }
  }
}
</style>
