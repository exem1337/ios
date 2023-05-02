<template>
  <div class="dots-item">
    <div class="flex">
      <p>{{ TERM_NAME_MAP.get(dot.Name) }}</p>
      <div class="value-select">
        <q-select 
          v-model="selectedValue"
          :options="selectOptions"
        />
      </div>
    </div>  

    <LineChart 
      :chartData="chartData"
      :key="currentKey" 
    />
    <div
      v-for="(val, key) in xyS.x" 
      class="inputs"
      :key="key"
    >
      <q-input 
        @update:modelValue="event => xyS.x[key] = Number(event)"
        type="number"
        mask="000"
        :maxlength="3"
        :modelValue="xyS.x[key]"
        label="x"
      />
      <q-input 
        @update:modelValue="event => xyS.x[key] = Number(event)"
        type="number"
        mask="000"
        :maxlength="3"
        :modelValue="xyS.y[key]"
        label="y"  
      />
    </div>
    <q-btn 
      color="primary"
      @click="onSave"
    >
      Сохранить
    </q-btn>    
  </div>
</template>

<script lang="ts" setup>
import { TERM_NAME_MAP } from 'src/constants/TermNamesMap.const';
import { ISystemDot } from 'src/models/fuzzy.model';
import { fillDotsDefaultValues, getChartValues } from 'src/utils/chartValues.util';
import { computed, reactive, ref, watch } from 'vue';
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
import { cloneDeep } from 'lodash-es';
import { api } from 'src/boot/axios';

const props = defineProps<{
  dot: ISystemDot;
}>();

const emits = defineEmits<{
  (e: 'save'): void;
}>();

Chart.register(...registerables);

const instance = ref(fillDotsDefaultValues(cloneDeep(props.dot)));
const currentKey = ref(0);
const selectOptions = computed<Array<string>>(() => props.dot.Values.reduce((acc, val) => acc = [...acc, val.Name], []))
const selectedValue = ref(selectOptions?.value?.[0]);
const currentItem = computed(() => instance.value?.Values?.find((el) => el.Name === selectedValue.value));

const xyS = reactive({
  x: [...currentItem.value?.Value.x],
  y: [...currentItem.value.Value.y],
})

const chartData = computed(() => ({
  labels: getChartValues(xyS)?.x,
  datasets: [
    {
      label: currentItem.value?.Name,
      data: getChartValues(xyS)?.y,
      backgroundColor: '#5d4037',
      borderColor: '#5d4037',
    },
  ],
  width: '400px',
  height: '400px'
}))

async function onSave() {
  await api.patch('/editDots', {
    values: [
      {
        Key: currentItem.value?.Key,
        Value: JSON.stringify({
          ...xyS
        })
      }
    ]
  })
  emits('save');
}

watch(
  () => selectedValue.value,
  () => {
    xyS.x = [...currentItem.value?.Value.x];
    xyS.y = [...currentItem.value?.Value.y];
  }
)
</script>

<style lang="scss" scoped>
.dots-item {
  border-radius: 4px;
  padding: 16px;
  max-width: 600px;
  height: max-content;
  border: 1px solid $primary;

  .flex {
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    .value-select {
      width: 40%;
    }

    .q-select {
      width: 100%;
    }

    p {
      margin-bottom: 0;
    }
  }

  .inputs {
    display: flex;
    gap: 8px;
    
    .q-input {
      width: 100%;
    }
  }

  .q-btn {
    margin-top: 16px;
  }
}
</style>