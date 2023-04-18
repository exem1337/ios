import { ERuleLevels, ERuleResultLevels } from "src/enums/rule.enum";

export interface IRule {
  Key: number;
  Attentiveness: ERuleLevels; 
  Discipline_Level: ERuleLevels;
  Perseverance: ERuleLevels;
  Responsibility: ERuleLevels;
  Result: ERuleResultLevels;
  Self_Development: ERuleLevels;
  Stress: ERuleLevels;
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
  Attentiveness: IRuleDots; 
  Discipline_Level: IRuleDots;
  Perseverance: IRuleDots;
  Responsibility: IRuleDots;
  Result: IRuleDots;
  Self_Development: IRuleDots;
  Stress: IRuleDots;
}