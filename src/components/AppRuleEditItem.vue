<template>
  <div class="rule-edit">
    <LineChart 
      :chartData="testData" 
    />
    <div class="rule-edit__wrapper">
      <q-select 
        v-model="selectedValue" 
        :options="options" 
        @update:modelValue="onChange"
      />
      <q-btn 
        v-if="saveable"
        color="primary"
        @click="$emit('save')"
      >
        Сохранить
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
import { onBeforeMount, ref } from 'vue';
import { ERuleLevels, ERuleResultLevels } from 'src/enums/rule.enum';
import { IRuleDots } from '../models/rules.model';
import { getChartValues } from 'src/utils/chartValues.util';
import { api } from 'src/boot/axios';
import { ETermNames } from 'src/enums/fuzzyNames.enum';
import { termOptionsMap } from 'src/constants/termOptions.const';

const props = defineProps<{
  item: ERuleLevels | ERuleResultLevels;
  name: ETermNames;
  dots: IRuleDots;
  termName: ETermNames;
  modelValue: string;
  saveable?: boolean;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'save'): void;
}>();

const selectedValue = ref(props.item);
const options = ref(termOptionsMap.get(props.name));
const chartValues = ref<IRuleDots>();
Chart.register(...registerables);
const testData = ref();

function setData() {
  testData.value = {
    labels: chartValues.value?.x,
    datasets: [
      {
        label: props.name,
        data: chartValues.value?.y,
        backgroundColor: '#5d4037',
        borderColor: '#5d4037',
      },
    ],
    width: '500px',
  }
}

async function onChange() {
  const res = await api.get(`/getTermDotsIos?name=${props.termName}&value=${selectedValue.value.toLowerCase()}`).then((res) => res.data.Data);
  chartValues.value = getChartValues(res);
  setData();
  emits('update:modelValue', selectedValue.value);
}

onBeforeMount(async () => {
  chartValues.value = getChartValues(props.dots);
  setData();
})
</script>

<style lang="scss" scoped>
.rule-edit__wrapper {
  display: flex;
  margin-top: 14px;
  align-items: flex-end;
  
  .q-select {
    width: 100%;
  }
  
  .q-btn {
    margin-left: 8px;
    height: 36px;
  }
}
</style>