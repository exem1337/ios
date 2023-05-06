export const COURSE_RESULT_COLUMNS = [
  { name: 'fio', required: true, label: 'ФИО', align: 'left', field: 'fio', sortable: true },
  { name: 'Date_Submitted', align: 'right', label: 'Дата прохождения тастирования', field: 'Date_Submitted', sortable: true, format: (val: string) => new Date(val).toLocaleDateString('ru-RU'), },
  { name: 'Result', label: 'Результат', field: 'Result', sortable: true },
  { name: 'TestName', label: 'Название тестирования', field: 'TestName' },
]