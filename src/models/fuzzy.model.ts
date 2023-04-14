import {
  EAccuracynames,
  EFuzzyStatuses,
  ETermNames,
  EPercentageFuzzyStatuses,
  ETimeFuzzyStatuses,
} from 'src/enums/fuzzyNames.enum';

export type TFuzzyName =
  | EPercentageFuzzyStatuses
  | ETimeFuzzyStatuses
  | EFuzzyStatuses;

export interface IFuzzyBound {
  name: ETermNames;
  fuzzyName: TFuzzyName;
  bounds: IFuzzyBoundSetting;
}

export interface IFuzzyBoundSetting {
  inner: Array<Number>;
  outerLeft?: Array<number>;
  outerRight?: Array<number>;
}

export interface IFuzzyCheckResult {
  accuracy: EAccuracynames;
  fuzzyName: TFuzzyName;
  name: ETermNames;
}

export interface IFuzzyRuleStatement {
  accuracy?: EAccuracynames;
  fuzzyName: TFuzzyName;
  name: ETermNames;
}

export interface IFuzzyRule {
  statements: Array<IFuzzyRuleStatement>;
  result: EFuzzyStatuses;
}

export interface IRuleDots {
  x: Array<number>;
  y: Array<number>;
}

export interface IDifficulty {
  Key: number;
  
}