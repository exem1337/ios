import { ITestQuestion, ITestUserAnswer } from 'src/models/test.model';

export class TestManager {
  public checkTestCorrectivity(
    questions: Array<ITestQuestion>,
    answers: Array<ITestUserAnswer>
  ): number {
    const correctCount = answers?.reduce((acc, ans) => {
      const question: ITestQuestion | undefined =
        questions.find((question) => question.id === ans.questionId) ||
        undefined;

      if (!question) {
        return acc;
      }

      return question.answers.find((qAns) => qAns.id === ans.answerId)
        ?.isCorrect
        ? acc + 1
        : acc;
    }, 0);

    return (correctCount / questions.length) * 100;
  }
}
