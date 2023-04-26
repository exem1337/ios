import { EFuzzyStatuses, EPercentageFuzzyStatuses, ETermNames, ETimeFuzzyStatuses, ETopicTimeFuzzyStatuses } from 'src/enums/fuzzyNames.enum';

export const termOptionsMap = new Map<ETermNames, Array<ETimeFuzzyStatuses | EPercentageFuzzyStatuses | EFuzzyStatuses | ETopicTimeFuzzyStatuses>>([
  [ETermNames.AnswerTime, [
    ETimeFuzzyStatuses.Fast,
    ETimeFuzzyStatuses.Medium,
    ETimeFuzzyStatuses.Slow,
    ETimeFuzzyStatuses.LowerMedium,
    ETimeFuzzyStatuses.UpperMedium
  ]],
  [ETermNames.CorrectPercentage, [
    EPercentageFuzzyStatuses.AlmostCorrect,
    EPercentageFuzzyStatuses.AlmostIncorrect,
    EPercentageFuzzyStatuses.Correct,
    EPercentageFuzzyStatuses.Incorrect,
    EPercentageFuzzyStatuses.Medium,
  ]],
  [ETermNames.Result, [
    EFuzzyStatuses.Expert,
    EFuzzyStatuses.Master,
    EFuzzyStatuses.Newbie,
    EFuzzyStatuses.Professional,
    EFuzzyStatuses.Student
  ]],
  [ETermNames.TestDifficuilty, [
    EFuzzyStatuses.Expert,
    EFuzzyStatuses.Master,
    EFuzzyStatuses.Newbie,
    EFuzzyStatuses.Professional,
    EFuzzyStatuses.Student
  ]],
  [ETermNames.TopicTime, [
    ETopicTimeFuzzyStatuses.Fast,
    ETopicTimeFuzzyStatuses.Medium,
    ETopicTimeFuzzyStatuses.Slow,
    ETopicTimeFuzzyStatuses.LowerMedium,
    ETopicTimeFuzzyStatuses.UpperMedium
  ]]
]);