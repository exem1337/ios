import {
  EAccuracynames,
  EFuzzyStatuses,
  EPercentageFuzzyStatuses,
  ETermNames,
  ETimeFuzzyStatuses,
} from 'src/enums/fuzzyNames.enum';
import { IFuzzyRule } from 'src/models/fuzzy.model';

export const FUZZY_RULES: Array<IFuzzyRule> = [
  {
    statements: [
      {
        accuracy: EAccuracynames.Accurate,
        fuzzyName: ETimeFuzzyStatuses.Fast,
        name: ETermNames.AnswerTime,
      },
      {
        accuracy: EAccuracynames.Accurate,
        fuzzyName: EPercentageFuzzyStatuses.Correct,
        name: ETermNames.CorrectPercentage,
      },
      {
        fuzzyName: EFuzzyStatuses.Professional,
        name: ETermNames.TestDifficuilty,
      },
    ],
    result: EFuzzyStatuses.Expert,
  },
  {
    statements: [
      {
        accuracy: EAccuracynames.NonAccurate,
        fuzzyName: ETimeFuzzyStatuses.Slow,
        name: ETermNames.AnswerTime,
      },
      {
        accuracy: EAccuracynames.NonAccurate,
        fuzzyName: EPercentageFuzzyStatuses.AlmostCorrect,
        name: ETermNames.CorrectPercentage,
      },
      {
        fuzzyName: EFuzzyStatuses.Master,
        name: ETermNames.TestDifficuilty,
      },
    ],
    result: EFuzzyStatuses.Student,
  },
  {
    statements: [
      {
        accuracy: EAccuracynames.NonAccurate,
        fuzzyName: ETimeFuzzyStatuses.Fast,
        name: ETermNames.AnswerTime,
      },
      {
        accuracy: EAccuracynames.Accurate,
        fuzzyName: EPercentageFuzzyStatuses.Medium,
        name: ETermNames.CorrectPercentage,
      },
      {
        fuzzyName: EFuzzyStatuses.Newbie,
        name: ETermNames.TestDifficuilty,
      },
    ],
    result: EFuzzyStatuses.Master,
  },
  {
    statements: [
      {
        accuracy: EAccuracynames.NonAccurate,
        fuzzyName: ETimeFuzzyStatuses.Fast,
        name: ETermNames.AnswerTime,
      },
      {
        accuracy: EAccuracynames.NonAccurate,
        fuzzyName: EPercentageFuzzyStatuses.AlmostIncorrect,
        name: ETermNames.CorrectPercentage,
      },
      {
        fuzzyName: EFuzzyStatuses.Student,
        name: ETermNames.TestDifficuilty,
      },
    ],
    result: EFuzzyStatuses.Newbie,
  },
  {
    statements: [
      {
        accuracy: EAccuracynames.Accurate,
        fuzzyName: ETimeFuzzyStatuses.Medium,
        name: ETermNames.AnswerTime,
      },
      {
        accuracy: EAccuracynames.Accurate,
        fuzzyName: EPercentageFuzzyStatuses.Medium,
        name: ETermNames.CorrectPercentage,
      },
      {
        fuzzyName: EFuzzyStatuses.Professional,
        name: ETermNames.TestDifficuilty,
      },
    ],
    result: EFuzzyStatuses.Professional,
  },
  {
    statements: [
      {
        accuracy: EAccuracynames.NonAccurate,
        fuzzyName: ETimeFuzzyStatuses.Medium,
        name: ETermNames.AnswerTime,
      },
      {
        accuracy: EAccuracynames.NonAccurate,
        fuzzyName: EPercentageFuzzyStatuses.Correct,
        name: ETermNames.CorrectPercentage,
      },
      {
        fuzzyName: EFuzzyStatuses.Student,
        name: ETermNames.TestDifficuilty,
      },
    ],
    result: EFuzzyStatuses.Master,
  },
  {
    statements: [
      {
        accuracy: EAccuracynames.Accurate,
        fuzzyName: ETimeFuzzyStatuses.Fast,
        name: ETermNames.AnswerTime,
      },
      {
        accuracy: EAccuracynames.NonAccurate,
        fuzzyName: EPercentageFuzzyStatuses.AlmostCorrect,
        name: ETermNames.CorrectPercentage,
      },
      {
        fuzzyName: EFuzzyStatuses.Newbie,
        name: ETermNames.TestDifficuilty,
      },
    ],
    result: EFuzzyStatuses.Student,
  },
  {
    statements: [
      {
        accuracy: EAccuracynames.Accurate,
        fuzzyName: ETimeFuzzyStatuses.Slow,
        name: ETermNames.AnswerTime,
      },
      {
        accuracy: EAccuracynames.Accurate,
        fuzzyName: EPercentageFuzzyStatuses.Correct,
        name: ETermNames.CorrectPercentage,
      },
      {
        fuzzyName: EFuzzyStatuses.Newbie,
        name: ETermNames.TestDifficuilty,
      },
    ],
    result: EFuzzyStatuses.Student,
  },
  {
    statements: [
      {
        accuracy: EAccuracynames.NonAccurate,
        fuzzyName: ETimeFuzzyStatuses.Medium,
        name: ETermNames.AnswerTime,
      },
      {
        accuracy: EAccuracynames.Accurate,
        fuzzyName: EPercentageFuzzyStatuses.Correct,
        name: ETermNames.CorrectPercentage,
      },
      {
        fuzzyName: EFuzzyStatuses.Student,
        name: ETermNames.TestDifficuilty,
      },
    ],
    result: EFuzzyStatuses.Master,
  },
  {
    statements: [
      {
        accuracy: EAccuracynames.NonAccurate,
        fuzzyName: ETimeFuzzyStatuses.Medium,
        name: ETermNames.AnswerTime,
      },
      {
        accuracy: EAccuracynames.Accurate,
        fuzzyName: EPercentageFuzzyStatuses.Correct,
        name: ETermNames.CorrectPercentage,
      },
      {
        fuzzyName: EFuzzyStatuses.Master,
        name: ETermNames.TestDifficuilty,
      },
    ],
    result: EFuzzyStatuses.Professional,
  },
];
