export enum EFuzzyStatuses {
  Newbie = 'Новичок',
  Student = 'стажер',
  Master = 'Мастер',
  Professional = 'Профессионал',
  Expert = 'Эксперт',
  UnCalculated = 'Не определено',
}

export enum ETimeFuzzyStatuses {
  Slow = 'Очень длинная',
  Medium = 'Длинная',
  LowerMedium = 'Средняя',
  UpperMedium = 'Короткая',
  Fast = 'Очень короткая',
}

export enum ETopicTimeFuzzyStatuses {
  Slow = 'Очень большое',
  LowerMedium = 'Большое',
  Medium = 'Среднее',
  UpperMedium = 'Малое',
  Fast = 'Очень малое'
}

export enum EPercentageFuzzyStatuses {
  Incorrect = 'Неправильно',
  AlmostIncorrect = 'Почти неправильно',
  Medium = 'Средняя правильность',
  AlmostCorrect = 'Почти правильно',
  Correct = 'Абсолютно правильно',
}

export enum ETermNames {
  TestDifficuilty = 'Сложность теста',
  AnswerTime = 'Время ответа',
  CorrectPercentage = 'Процент правильности ответов',
  Result = 'Результат',
  TopicTime = 'Время изучения материала'
}

export enum EAccuracynames {
  NonAccurate = 'Низкая степень уверенности',
  Accurate = 'Высокая степень уверенности',
}

export enum ESystemFuzzyNames {
  TestDifficuilty = 'Test_Difficulty',
  Result = 'Result',
  AnswerTime = 'Answer_Time',
  CorrectPercentage = 'Correct_Percentage',
  TopicTime = 'Topic_Time',
}
