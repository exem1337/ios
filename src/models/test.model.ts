export interface ITest {
  id: number;
  questions: Array<ITestQuestion>;
}

export interface ITestQuestion {
  id: number;
  title: string;
  answers: Array<ITestAnswer>;
}

export interface ITestAnswer {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface ITestUserAnswer {
  questionId: number;
  answerId: number;
}
