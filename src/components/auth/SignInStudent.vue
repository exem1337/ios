<template>
  <q-card>
    <q-card-section class="bg-amber-6">
      <div class="text-h6 text-weight-bold">Студент</div>
    </q-card-section>
    <q-card-section>
      <q-input v-model="email" color="amber-6" label="Фамилия" type="email" />
      <q-input
        v-model="email"
        class="mt-tiny"
        color="amber-6"
        label="Имя"
        type="email"
        clearable
      />
      <q-input
        v-model="email"
        class="mt-tiny"
        color="amber-6"
        label="Отчество"
        type="email"
        clearable
      />
      <q-input
        v-model="email"
        class="mt-tiny"
        color="amber-6"
        label="Электронная почта"
        type="email"
        clearable
      />
      <q-select
        class="mt-tiny"
        color="amber-6"
        v-model="studentCourse"
        :options="courseNumberOptions"
        label="Курс"
      />
      <q-select
        class="mt-tiny"
        color="amber-6"
        v-model="studentFaculty"
        :options="facultyOptions"
        label="Факультет"
      />
      <q-select
        class="mt-tiny"
        color="amber-6"
        v-model="studentGroup"
        :options="groupOptions"
        label="Группа"
      />
      <div class="flex mt-tiny">
        <q-btn icon="event" round color="amber-6">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date
              color="amber-6"
              v-model="dateOfbirth"
              :navigation-max-year-month="
                date.formatDate(Date.now(), 'YYYY-MM-DD')
              "
              title="Дата рождения"
              subtitle="Студент"
            >
              <div class="row items-center justify-end q-gutter-sm">
                <q-btn label="Cancel" color="secondary" flat v-close-popup />
                <q-btn label="OK" color="secondary" flat v-close-popup />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-btn>
        <p class="ml-tiny">Дата рождения</p>
      </div>
      <div class="btn">
        <q-btn
          class="mt-tiny"
          color="amber-6"
          size="md"
          label="Зарегистрироваться как студент"
          to="/courses"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { EStudentCourseNumbers } from 'src/enums/studentCourseNumbers.enum';
import { date } from 'quasar';

const email = ref();
const courseNumberOptions = [
  EStudentCourseNumbers.First,
  EStudentCourseNumbers.Second,
  EStudentCourseNumbers.Third,
  EStudentCourseNumbers.Fourth,
  EStudentCourseNumbers.Fifth,
];
const facultyOptions = ['ФМИТ', 'АКИ', 'АСФ', 'ИНПО', 'ИНоЗем'];
const groupOptions = ['19ИВТ(б)-ПОВТ', '19ИВТ(б)-ВМК'];
const studentCourse = ref<EStudentCourseNumbers>();
const studentFaculty = ref();
const studentGroup = ref();
const dateOfbirth = ref();
</script>

<style lang="scss" scoped>
.q-card {
  .q-card__section {
    .flex {
      p {
        margin-bottom: 0;
      }
    }

    .btn {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
