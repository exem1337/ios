<template>
  <AppLoader v-if="isDataLoading" />
  <div
    v-else 
    class="expert"
  >
    <h4>База правил</h4>
    <q-btn 
      color="primary"
      @click="onRuleCreate"
    >
      Создать правило
    </q-btn>
    <div class="expert__rules">
      <div
        v-for="rule in rules"
        :key="rule.Key" 
        class="expert__rules--rule"
        @click="onGoToRule(rule.Key)"
      >
        <span>ЕСЛИ СЛОЖНОСТЬ ТЕСТА {{ rule.Test_Difficulty }}</span>
        <span>И ВРЕМЯ ОТВЕТА НА ВОПРОС {{ rule.Answer_Time }}</span>
        <span>И ВРЕМЯ ИЗУЧЕНИЯ МАТЕРИАЛА {{ rule.Topic_Time }}</span>  
        <span>И ПРАВИЛЬНОСТЬ ОТВЕТОВ {{ rule.Correct_Percentage }}</span>  
        <span>ТО {{ rule.Result }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from 'src/boot/axios';
import { IRule } from 'src/models/rules.model';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import AppLoader from 'components/AppLoader.vue';

const rules = ref<Array<IRule>>();
const router = useRouter();
const isDataLoading = ref();

function onGoToRule(key: number) {
  router.push(`/expert/rules/${key}`);
}

function onRuleCreate() {
  router.push('/expert/rules');
}

onBeforeMount(async () => {
  isDataLoading.value = true;
  rules.value = await api.get('/getIosRules').then((res) => res.data.Data);
  isDataLoading.value = false;
})
</script>

<style lang="scss" scoped>
.expert {
  h4 {
    font-size: 24px;
    height: fit-content;  
    width: fit-content;
    margin: 0 auto;
    color: #616161;
    margin-bottom: 16px;
  }

  .q-btn {
    margin-bottom: 16px;
  }

  max-width: 95vw;
  margin: 0 auto;
  margin-top: 24px;
  margin-bottom: 24px;

  &__rules {
    display: flex;
    flex-direction: column;
    gap: 16px;

    &--rule {
      background-color: #ffd998;
      color: #5d4037;
      transition: .3s ease;
      font-weight: 700;
      padding: 16px 8px;
      cursor: pointer;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 4px;

      &:hover {
        background-color: lighten(#ffd998, 5%);
        color: lighten(#5d4037, 5%);
      }

      span {
        text-transform: uppercase;
      }
    }
  }
}
</style>