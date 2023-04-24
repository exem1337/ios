<template>
  <div class="fuzzy-result">
    Ваш результат: {{ componentProps.resultTerm }}

    <div class="fuzzy-result__main">
      <LineChart 
        :chartData="mainData" 
      />
    </div>

    <div class="fuzzy-result__others">
      <LineChart 
        v-for="(data, key) in otherData"
        :chartData="data"
        :key="key" 
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IFuzzyResult } from 'src/models/user.model';
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import { getResultValues } from 'src/utils/chartValues.util';

const props = defineProps<{
  componentProps: IFuzzyResult;
}>()
Chart.register(...registerables);

const mainData = {
  labels: props.componentProps.resultFunc.x,
  datasets: [
    {
      label: 'Результатирующая функция',
      data: props.componentProps.resultFunc.y,
      backgroundColor: '#5d4037',
      borderColor: '#5d4037',
    },
    {
      label: 'Результат',
      data: getResultValues(props.componentProps.result),
      backgroundColor: '#c62828',
      borderColor: '#c62828',
    },
  ],
  width: '400px',
  height: '400px'
}
const otherData = props.componentProps.graphs.map((el) => ({
  labels: el.x,
  datasets: [
    {
      label: 'правило',
      data: el.y,
      backgroundColor: '#5d4037',
      borderColor: '#5d4037',
    },
    {
      label: 'Результат',
      data: getResultValues(props.componentProps.result),
      backgroundColor: '#c62828',
      borderColor: '#c62828',
    },
  ],
  width: '400px',
}))
</script>

<style lang="scss" scoped>
:global(.q-dialog__inner--minimized > div) {
  max-width: unset !important;
}
.fuzzy-result {
  min-width: 350px;
  max-width: 800px;
  &__main {
    :deep(canvas) {
      height: 400px !important;
    }
  }
  &__others {
    margin-top: 20px;
    justify-content: space-between;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    :deep(canvas) {
      width: 400px !important;
      height: 400px !important;
    }
  }
}
</style>