<template>
  <q-card class="topics">
    <span class="topics--header">Список тем</span> 
    <div 
      v-for="topic in topics"
      :key="topic.TopicKey"
      :class="{ 'selected' : currentTopic === topic.Key }"
      class="topics__item"
      @click="$emit('select', topic.Key)"
    >
      <div class="topics__item--inner">
        <span>{{ topic.Number }}. {{ topic.Name }}</span>
        <q-icon 
          v-if="currentTopic === topic.Key"
          name="done" 
        />
      </div>
      <q-separator />
    </div>
  </q-card>
</template>

<script lang="ts" setup>
import { IDisciplineTopic } from 'src/models/course.model';

defineProps<{
  topics: Array<IDisciplineTopic>;
  currentTopic: number;
}>();

defineEmits<{
  (e: 'select', value: number): void;
}>()
</script>

<style lang="scss" scoped>
.topics {
  padding: 8px;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 500px;
  max-width: 200px;
  overflow-wrap: break-word;

  .topics__item.selected {
    .topics__item--inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__item {
    cursor: pointer;
    width: 100%;
    padding-bottom: 8px;
  }
}
</style>