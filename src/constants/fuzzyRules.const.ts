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
];
