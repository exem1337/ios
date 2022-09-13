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
      <q-date class="mt-tiny" color="amber-6" v-model="date" />
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { EStudentCourseNumbers } from 'src/enums/studentCourseNumbers.enum';

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
const date = ref();
</script>

<style lang="scss" scoped></style>
