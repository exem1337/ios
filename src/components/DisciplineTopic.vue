<template>
  <div class="topics-list">
    <div class="topics-list__topic">
      <div class="topics-list__topic--header">
        <span>{{ topics?.[0]?.Number }}. {{ topics?.[0]?.Name }}</span>
        <q-icon
          name="expand_circle_down"
          :class="{ 'open' : isOpen }"
          @click="isOpen = !isOpen"
        />
      </div>
      
      <div
        :class="{ 'open' : isOpen }" 
        class="topics-list__topic--content"
      >
        <div class="topics-list__topic--content__buttons">
          <q-btn 
            v-if="!isShowNewTopic"
            :disable="!selectItems.length"
            color="primary"
            class="btn-add-new"
            @click="isShowNewTopic = true"
          >
            Добавить обучающий материал с новой сложностью
          </q-btn>
          <q-btn 
            color="primary"
            class="btn-add-new"
            @click="onDeleteTopic(topics?.[0]?.Key)"
          >
            Удалить тему
          </q-btn>
        </div>
        <div
          v-if="isShowNewTopic" 
          class="topics-list__topic--content__item"
        >
          <div class="topics-list__topic--content__item--header">
            <span>Новый обучающий материал</span>
            <q-select
              label="Сложность"
              :options="selectItems"
              v-model="selectedDifficulty"
              :option-value="(option) => option.Key"
              :option-label="(option) => option.Name"
            />
            <div class="btn-wrapper">
              <div class="save-btn-wrapper">
                <q-btn
                  color="secondary"
                  :disable="!selectedDifficulty?.Key || !newTopicFile"
                  @click="onCreateTopic"
                >
                  Сохранить
                </q-btn>
                <q-tooltip
                  v-if="!selectedDifficulty?.Key || !newTopicFile"  
                  anchor="top middle" 
                  color="primary"
                  class="bg-brown-7"
                  self="bottom middle" 
                  :offset="[10, 10]"
                >
                  Необходимо выбрать файл и сложность
                </q-tooltip>
              </div>
              <q-btn
                color="secondary"
                @click="isShowNewTopic = false"
              >
                Отменить
              </q-btn>
            </div>
          </div>
          <AppImageUploader
            label="Обучающий материал"
            accept="application/pdf"
            type="application/pdf"
            @add="newTopicFile = $event.fileKey"
            @remove="newTopicFile = $event.fileKey"
          />
        </div>
        <div
          v-for="(topic, key) in filteredTopics"
          :key="key" 
          class="topics-list__topic--content__item"
        >
          <div class="topics-list__topic--content__item--header">
            <span>Сложность: {{ getDifficulty(topic.Diff_Level_Key) }}</span>
            <q-btn
              color="secondary"
              @click="onEditTest(topic.Test_Key, topic.MaterialKey)"
            >
              Редактировать тест
            </q-btn>
          </div>
          <AppImageUploader
            label="Обучающий материал"
            :file="topic.File_Link"
            accept="application/pdf"
            :model="topic"
            type="application/pdf"
            @add="onAddMaterial"
            @remove="onAddMaterial"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IDisciplineDifficulty, IDisciplineTopic } from 'src/models/course.model';
import { ref, computed } from 'vue';
import AppImageUploader from 'components/AppImageUploader.vue';
import { IAddImage } from 'src/models/test.model';
import { api } from 'src/boot/axios';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps<{
  topics: Array<IDisciplineTopic>;
  difficulties: Array<IDisciplineDifficulty>;
  preventUpload: boolean;
  getDifficulty: (key: number) => string | undefined;
}>();

const emits = defineEmits<{
  (e: 'load'): void;
}>();

const isOpen = ref(false);
const router = useRouter();
const route = useRoute();
const isShowNewTopic = ref(false);
const selectItems = computed(() => props.difficulties.filter((diff) => !props.topics.find((topic) => topic.Diff_Level_Key === diff.Key)));
const selectedDifficulty = ref();
const newTopicFile = ref();
const filteredTopics = computed(() => props.topics.filter((topic) => topic.Diff_Level_Key));

async function onAddMaterial(value: IAddImage) {
  if (props.preventUpload) {
    return;
  }

  await api.patch(`/editTopicMaterial/${value.model.MaterialKey}`, {
    fileKey: value.fileKey,
  })
}

function onEditTest(key: number, materialKey: number) {
  if (key) {
    router.push(`/courses/${route.params.id}/edit/test/${key}`);
  }
  else {
    router.push(`/courses/${route.params.id}/edit/${materialKey}/test`);
  }
}

async function onDeleteTopic(key: number) {
  await api.delete(`/deleteTopic/${key}`);
  emits('load');
}

async function onCreateTopic() {
  await api.post('/postTopicMaterial', {
    fileKey: newTopicFile.value,
    diffLevelKey: selectedDifficulty.value.Key,
    topicKey: props.topics?.[0].Key,
  })
  emits('load');
}
</script>

<style lang="scss" scoped>
.topics-list {
  margin-top: 24px;

  .theme-create {
    margin-bottom: 8px;
  }

  p {
    font-size: 1rem;
    font-weight: 500;
  }

  &__topic {
    width: 100%;
    padding: 16px;
    border-radius: 4px;
    margin-bottom: 8px;
    background-color: #ffd998;
    color: #5d4037;
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    transition: .3s ease;
    position: relative;
    font-weight: 700;

    &--header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .q-icon {
        font-size: 1.5rem;
        transition: .3s ease;

        &.open {
          transform: rotate(180deg);
        }
      }
    }
    
    &--content {
      height: 0;
      -webkit-transition: height .3s ease;
      -moz-transition: height .3s ease;
      -o-transition: height .3s ease;
      transition: height .3s ease;
      overflow: hidden;

      &__buttons {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .btn-add-new {
        margin-top: 16px;
      }

      &.open {
        height: fit-content;
        
        .topics-list__topic--content__item {
          display: flex;
        }
      }

      &__item {
        display: none;
        margin-top: 16px;
        width: 100%;
        background-color: #fff;
        border-radius: 4px;
        padding: 16px;
        color: #3e2723;

        &--header {
          min-width: 30%;
          margin-right: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;

          .q-btn {
            width: fit-content;
          }

          .btn-wrapper {
            display: flex;
            align-items: flex-end;
            gap: 8px;

            .q-btn {
              height: 36px;
              width: fit-content;
            }
          }

          .save-btn-wrapper {
            width: fit-content;
            height: fit-content;
            margin-top: 16px;
          }
        }

        .q-uploader {
          width: 100%;
        }

        span {
          color: black;
        }
      }
    }

    .icons {
      position: absolute;
      top: 8px;
      right: 8px;
      display: flex;
      gap: 16px;
      font-size: 1.25rem;
    }

    &:hover {
      background-color: lighten(#ffd998, 5%);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>