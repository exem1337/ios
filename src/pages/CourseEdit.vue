<template>
  <AppLoader v-if="isDataLoading" />
  <q-card v-else>
    <h4>Редактирование дисциплины: {{ discipline?.Name }}</h4>
    <div class="topic-name">
      <q-input
        label="Название"
        color="brown-7"
        v-model="nameRef.name"
      /> 
      <q-input
        label="Краткое название"
        color="brown-7"
        v-model="nameRef.shName"
      />
    </div>
    <q-btn 
      color="primary"
      @click="onGoToUsers"
    >
      Управление доступом
      <q-tooltip
        anchor="top middle" 
        color="primary"
        self="bottom middle" 
        :offset="[10, 10]"
      >
        Назначить обучающихся, которым будет видна дисциплина
      </q-tooltip>
    </q-btn>
    <div class="topics-list">
      <p>Список тем</p>
      <q-btn 
        v-if="!isShowNewTheme"
        color="secondary"
        class="theme-create"
        @click="isShowNewTheme = true"
      >
        Создать тему
      </q-btn>

      <div
        v-else 
        class="topics-list__new"
      >
        <q-input
          label="Название темы" 
          v-model="newThemeName" 
        />
        <div>
          <q-btn
            color="primary"
            @click="onThemeCreate"
          >
            Сохранить
          </q-btn>
          <q-btn
            color="primary"
            @click="isShowNewTheme = false"
          >
            Отменить
          </q-btn>
        </div>
      </div>

      <DisciplineTopic 
        v-for="(topic, key) in sortedTopics"
        :key="key"
        :difficulties="diffs"
        :topics="topic"
        :prevent-upload="isPreventUpload"
        :getDifficulty="getDifficultyName"
        @load="loadData"
      />

      <q-btn
        class="save-btn"
        color="primary"
        @click="onSave"
      >
        Сохранить изменения
      </q-btn>
    </div>
  </q-card>
  <AppModal 
    v-model="isShowTopicMaterialModal" 
    :options="topicModalProps" 
    @close="isShowTopicMaterialModal = false"
    @ok="onAddTopicMaterial"
  />
</template>

<script lang="ts" setup>
import { api } from 'src/boot/axios';
import { IBasedResponse } from 'src/models/api.model';
import { IDiscipline, IDisciplineDifficulty, IDisciplineTopic } from 'src/models/course.model';
import { Ref, onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppModal from 'components/AppModal.vue';
import { IModalProps } from 'src/models/modal.model';
import EditTopicFile from 'components/EditTopicFile.vue';
import { useMeta } from 'quasar';
import DisciplineTopic from 'components/DisciplineTopic.vue';
import AppLoader from 'components/AppLoader.vue';

const route = useRoute();
const router = useRouter();
const discipline = ref<IDiscipline>();
const topics = ref<Array<IDisciplineTopic>>([]);
const diffs = ref<Array<IDisciplineDifficulty>>([]);
const isShowTopicMaterialModal = ref(false);
const nameRef = ref({
  name: '',
  shName: '',
})
const currentEditingTopic = ref<IDisciplineTopic>();
const sortedTopics = ref<Array<Array<IDisciplineTopic>>>();
const isPreventUpload = ref(true);
const isDataLoading = ref(false);
const topicModalProps = ref<IModalProps> ({
  component: EditTopicFile,
  headerText: 'Материал темы',
  okButtonText: 'Сохранить',
  componentModelValue: ''
});
const isShowNewTheme = ref(false);
const newThemeName = ref();

function onGoToUsers() {
  router.push(`/courses/${route.params.id}/edit/users`);
}

function getDifficultyName(key: number) {
  return diffs.value.find((diff) => diff.Key === key)?.Name;
}

async function onSave() {
  await api.patch(`/editDiscipline/${route.params.id}`, {
    name: nameRef.value.name,
    shName: nameRef.value.shName,
  })
  await loadData();
}

async function onThemeCreate() {
  await api.post('/postTopic', {
    Name: newThemeName.value,
    Number: (topics.value.pop()?.Number ?? 0) + 1,
    Topic_Weight: 0,
    Discip_Key: Number(route.params.id), 
  })
  await loadData();
}

async function onAddTopicMaterial(salt: Ref<string>) {
  if (!currentEditingTopic.value) {
    return;
  }

  await api.post('/postTopicMaterial', {
    fileKey: salt.value,
    diffLevelKey: currentEditingTopic.value.Diff_Level_Key,
    topicKey: currentEditingTopic.value.TopicKey,
    testKey: currentEditingTopic.value.Test_Key,
  })
}

function onEditTopicMaterial(salt: string, topic: IDisciplineTopic) {
  currentEditingTopic.value = topic;
  topicModalProps.value.componentModelValue = salt;
  isShowTopicMaterialModal.value = true;
}

function sortTopics(topics: Array<IDisciplineTopic>): Array<Array<IDisciplineTopic>> {
  const result: Array<Array<IDisciplineTopic>> = [];

  topics.forEach((topic) => {
    const resultItem = result.find((res) => res.find((resItem) => resItem.Key === topic.Key));

    if (resultItem) {
      resultItem.push(topic);
    }
    else {
      result.push([topic]);
    }
  })

  return result.sort((a, b) => a[0]?.Number - b[0]?.Number);
}

async function loadData() {
  isDataLoading.value = true;
  isPreventUpload.value = true;
  diffs.value = await api.get('/getSlojnaList').then((res) => res.data.Data);
  discipline.value = await api.get(`/getDisciplines?by=key&id=${route.params.id}`).then((res) => res.data.Data?.[0]);
  nameRef.value.name = discipline.value?.Name ?? '';
  nameRef.value.shName = discipline.value?.ShName ?? '';
  topics.value = await api.get<IBasedResponse<Array<IDisciplineTopic>>>(`/getTopics?discipline=${route.params.id}`)
    .then((res) => res.data.Data.sort((a, b) => a.Number - b.Number));
  sortedTopics.value = sortTopics(topics.value);
  useMeta({
    title: `Редактирование дисциплины: ${discipline?.value?.Name}`
  })
  isPreventUpload.value = false;
  isDataLoading.value = false;
}

onBeforeMount(async () => {
  await loadData();
})
</script>

<style lang="scss" scoped>
.q-card {
  padding: 24px;
  max-width: 80vw;
  margin: 0 auto;
  margin-top: 24px;
  position: relative;
  margin-bottom: 16px;

  .save-btn {
    position: absolute;
    top: 8px;
    right: 8px;
  } 

  h4 {
    font-size: 1.5rem;
    margin: 0;
    margin-bottom: 24px;
  }

  .topics-list {
    margin-top: 16px;
  }

  .topic-name {
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 16px;
    font-weight: 700;

    .q-input {
      width: 100%;
    }
  }

  .topics-list__new {
    div {
      display: flex;
    }
    .q-btn {
      margin-top: 8px;
      margin-right: 8px;
    }
  }
}
</style>
