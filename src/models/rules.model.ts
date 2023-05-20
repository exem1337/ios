import { EPercentageFuzzyStatuses, ETimeFuzzyStatuses, ETopicTimeFuzzyStatuses } from "src/enums/fuzzyNames.enum";
import { ERuleLevels, ERuleResultLevels } from "src/enums/rule.enum";

export interface IRule {
  Key: number;
  Answer_Time: ETimeFuzzyStatuses;
  Correct_Percentage: EPercentageFuzzyStatuses;
  Test_Difficulty: ERuleResultLevels;
  Topic_Time: ETopicTimeFuzzyStatuses;
  Result: ERuleResultLevels;
}

export interface ICreateRule {
  Attentiveness: ERuleLevels;
  Discipline_Level: ERuleLevels;
  Perseverance: ERuleLevels;
  Responsibility: ERuleLevels;
  Result: string;
  Self_Development: ERuleLevels;
  Stress: ERuleLevels;
}

export interface IRuleDots {
  x: Array<number>;
  y: Array<number>;
}

export interface IRuleDotsResponse {
  Answer_Time: IRuleDots;
  Correct_Percentage: IRuleDots;
  Test_Difficulty: IRuleDots;
  Topic_Time: IRuleDots;
  Result: IRuleDots;
}