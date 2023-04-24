<template>
  <div class="test">
    <h4>{{ pageHeader }}</h4>

    <q-input 
      label="Название теста"
      v-model="testName"
    /> 

    <TestEditItem
      v-for="question in test?.Questions"
      :key="question.Key"
      :question="question"
      :prevent-update="preventUpdate"
      @on-delete="onDeleteAnswer"
      @update-question-name="onUpdateQuestionName"
      @update-answer="onUpdateAnswer"
      @on-add-answer="onAddAnswer"
      @update-question-image="onUpdateQuestionImage"
      @delete-question="onDeleteQuestion"
    />

    <q-btn
      size="md"
      class="create"
      color="primary"
      icon="add"
      @click="onAddQuestion"
    >
      Создать вопрос
    </q-btn>

    <q-btn
      size="md"
      class="save"
      color="primary"
      icon="save"
      @click="onSave"
    >
      Сохранить изменения
    </q-btn>
  </div>
</template>

<script lang="ts" setup>
import { ITest, ITestAnswerUpdate, ITestQuestionUpdate, IUpdateImage } from 'src/models/test.model';
import { onBeforeMount, ref, watch, nextTick } from 'vue';
import TestEditItem from 'components/TestEditItem.vue';
import { api } from 'src/boot/axios';
import { useRoute, useRouter } from 'vue-router';
import { useMeta } from 'quasar';
import { IDiscipline } from 'src/models/course.model';
import { AuthManager } from 'src/services/auth.service';
import { RouterGuardManager } from 'src/utils/routerGuard.util';

const test = ref<ITest>({
  Questions: [],
  Name: '',
});
const route = useRoute();
const router = useRouter();
const testName = ref();
const deletedAnswers = ref<Array<number>>([]);
const preventUpdate = ref(true);
const isTestNameUpdated = ref(false);
const updatedQuestionNames = ref<Array<ITestQuestionUpdate>>([]);
const updatedAnswers = ref<Array<ITestAnswerUpdate>>([]);
const pageHeader = ref();
const isCreate = ref(false);
const newQuestions = ref([]);
const newAnswers = ref([]);
const deletedQuestions = ref<Array<number>>([]);
const discipline = ref<IDiscipline>();

function onAddQuestion(): void {
  const question = {
    Header: '',
    Key: Math.random(),
    Answer: [],
    isNew: true,
  }
  const answer = {
    Key: Math.random(),
    IsCorrect: false,
    Text: '',
    isNew: true,
    questionKey: question.Key,
  }
  question.Answer.push(answer);
  newAnswers.value.push(answer);
  test.value?.Questions?.push(question);
  newQuestions.value.push(question);
}

function onDeleteQuestion(key: number) {
  deletedQuestions.value.push(key);
  updatedQuestionNames.value = updatedQuestionNames.value.filter((upd) => upd.key !== key);
  test.value.Questions = test.value.Questions?.filter((question) => question.Key !== key);
}

function onUpdateQuestionImage(data: IUpdateImage) {
  if (data.isNew) {
    const foundQuestion = newQuestions.value.find((question) => question.Key === data.key);
    
    if (foundQuestion) {
      foundQuestion.fileKey = data.fileKey;
      return;
    }
  }
  const foundQuestion = updatedQuestionNames.value.find((question) => question.key === data.key);
  if (foundQuestion) {
    foundQuestion.fileKey = data.fileKey;
  }
  else {
    updatedQuestionNames.value.push(data);
  }
}

function onUpdateQuestionName(question: ITestQuestionUpdate) {
  console.log(question)
  if (isCreate.value) {
    const foundQuestion = test.value.Questions?.find((q) => question.key === q.Key);
    if (foundQuestion) {
      console.log(foundQuestion)
      foundQuestion.Header = question.header;
    }
    return;
  }
  if (question.isNew) {
    const foundQuestion = newQuestions.value.find((ques) => ques.Key === question.key);
    if (foundQuestion) {
      foundQuestion.Img = question.img;
      foundQuestion.Header = question.header;
      return;  
    }
  }
  const foundQuestion = updatedQuestionNames.value.find((el) => el.key === question.key);
  
  if (foundQuestion) {
    foundQuestion.img = question.img;
    foundQuestion.header = question.header;
    return;
  }
  updatedQuestionNames.value.push(question);
}

function onUpdateTestName() {
  if (preventUpdate.value) {
    return;
  }
  isTestNameUpdated.value = true;
}

function onAddAnswer(event) {
  if (isCreate.value) {
    const foundQuestion = test.value.Questions?.find((question) => question.Key === event.questionKey);
    if (foundQuestion) {
      foundQuestion.Answer?.push(event.answer);
    }
    return;
  }
  newAnswers.value.push({
    Text: event.answer.text,
    IsCorrect: Number(event.answer.IsCorrect),
    questionKey: event.questionKey,
    Key: event.key,
  })
}

function onUpdateAnswer(answer: ITestAnswerUpdate) {
  if (isCreate.value) {
    const foundQuestion = test.value.Questions?.find((question) => question.Answer?.find((ans) => ans.Key === answer.key));
    const foundAnswer = foundQuestion?.Answer?.find((ans) => ans.Key === answer.key);
    
    if (foundAnswer) {
      foundAnswer.IsCorrect = answer.isCorrect;
      foundAnswer.Text = answer.text;
      foundAnswer.fileKey = answer.fileKey;
    }
    return;
  }
  
  if (answer.isNew) {
    const foundAnswer = newAnswers.value.find((ans) => answer.key === ans.Key);
    if (foundAnswer) {
      foundAnswer.IsCorrect = answer.isCorrect;
      foundAnswer.Text = answer.text;
      foundAnswer.fileKey = answer.fileKey;
    }
    return;
  }
  const foundAnswer = updatedAnswers.value.find((el) => el.key === answer.key);
  
  if (foundAnswer) {
    foundAnswer.text = answer.text;
    foundAnswer.isCorrect = answer.isCorrect;
    foundAnswer.fileKey = answer.fileKey;
    return;
  }
  updatedAnswers.value.push(answer);
}

async function onSave() {
  if (!route.params.testId) {
    let url = '/submitTest';
    const testId = await api.post(url, {
      name: testName.value,
      difficulty: 15
    }).then((res) => res.data.Data);
    console.log(testId)
    await api.patch(`/editTopicMaterial/${route.params.materialId}`, {
      testKey: testId,
    })
    test.value.Questions?.forEach(async (question) => {
      await api.post('/submitQuestion', {
        TestKey: testId,
        fileKey: question.fileKey,
        questionName: question.Header,
        varArr: question.Answer?.map((ans) => ({
          varName: ans.Text,
          correct: Number(ans.IsCorrect),
          
        }))
      })
    })

    router.push(`/courses/${route.params.id}/edit`)
    return;
  }

  if (deletedAnswers.value.length) {
    updatedAnswers.value.filter((ans) => deletedAnswers.value.includes(ans.key));
    await api.delete('/deleteAnswers', {
      data: {
        answers: deletedAnswers.value
      }
    })
  }

  if (deletedQuestions.value.length) {
    for await (const key of deletedQuestions.value) {
      await api.delete(`/deleteQuestion/${key}`)
    }
  }

  let body = {};

  if (newQuestions.value.length) {
    await newQuestions.value.map(async (el) => {
      const q = test.value.Questions?.find((quest) => quest.Key === el.Key);
      const answers = newAnswers.value.filter((newans) => newans.questionKey === el.Key);
      
      return await api.post('/submitQuestion', {
        TestKey: Number(route.params.testId),
        fileKey: el.fileKey,
        questionName: q?.Header,
        varArr: answers?.map((ans) => ({
          varName: ans.Text,
          correct: Number(ans.IsCorrect),
          fileKey: ans.fileKey,
        }))
      })
    })    
  }

  if (isTestNameUpdated.value) {
    body = {
      testName: testName.value
    }
  }

  if (updatedAnswers.value.length) {
    body = {
      ...body,
      answers: updatedAnswers.value.filter((ans) => ans.key > 1)
    }
  }

  if (updatedQuestionNames.value.length) {
    body = {
      ...body,
      questions: updatedQuestionNames.value.filter((name) => name.key > 1)
    }
  }

  if (newAnswers.value.length) {
    body = {
      ...body,
      newAnswers: newAnswers.value.map((ans) => ({
        text: ans.Text,
        isCorrect: ans.IsCorrect,
        fileKey: ans.fileKey,
        questionKey: ans.questionKey,
      })),
    }
  }

  await api.patch(`/editTest/${route.params.id}`, body);
  router.push(`/courses/${route.params.id}/edit`)
}

function onDeleteAnswer(key: number) {
  deletedAnswers.value.push(key);
}

function initEmptyTest() {
  testName.value = '';
  onAddQuestion();
}

watch(
  () => testName.value,
  () => (onUpdateTestName())
)

onBeforeMount(async () => {
  await AuthManager.refresh(router);
  RouterGuardManager.useAuthGuard(router, route);

  discipline.value = await api.get(`/getDisciplines?by=key&id=${route.params.id}`).then((res) => res.data.Data?.[0]);

  if (route.params.testId) {
    test.value = await api.get(`/getTest/${route.params.testId}?GetCorrect=true`).then((res) => res.data.Data);
    if (test.value === undefined) {
      initEmptyTest();
    }
    testName.value = test?.value?.Name;
    pageHeader.value = `Редактирование теста: ${test?.value?.Name}`
    useMeta({
      title: `Редактирование теста: ${test?.value?.Name}`,
    })
  }
  else {
    initEmptyTest();
    pageHeader.value = 'Создание теста'
    useMeta({
      title: 'Создание теста',
    })
    isCreate.value = true;
  }
  nextTick(() => (preventUpdate.value = false)) 
})
</script>

<style lang="scss" scoped>
.test {
  max-width: 75vw;
  width: 100%;
  margin: 0 auto;

  h4 {
    font-size: 24px;
    color: #616161;
  }

  .q-input {
    margin-top: 20px;
    margin-bottom: 8px;
  }

  .q-btn {
    margin-bottom: 20px;
  }

  .save {
    position: fixed;
    top: 80px;
    right: 40px;
    border-radius: 24px;

    :deep(.q-btn__content) {
      .q-icon {
        margin-right: 4px;
      }
    }
  }
}
</style>
