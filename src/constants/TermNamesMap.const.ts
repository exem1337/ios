import { ESystemFuzzyNames, ETermNames } from "src/enums/fuzzyNames.enum";

export const TERM_NAME_MAP = new Map<ESystemFuzzyNames, ETermNames>([
  [ESystemFuzzyNames.AnswerTime, ETermNames.AnswerTime],
  [ESystemFuzzyNames.CorrectPercentage, ETermNames.CorrectPercentage],
  [ESystemFuzzyNames.Result, ETermNames.Result],
  [ESystemFuzzyNames.TestDifficuilty, ETermNames.TestDifficuilty],
  [ESystemFuzzyNames.TopicTime, ETermNames.TopicTime],
])