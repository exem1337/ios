import {
  EAccuracynames,
  EFuzzyStatuses,
  ETermNames,
  EPercentageFuzzyStatuses,
  ETimeFuzzyStatuses,
  ESystemFuzzyNames,
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

export interface IEduTime {
  Key: number;
  Phys_Key: number;
  Time: number;
  Topic_Material_Key: number;
}

export interface ISystemDot {
  Key: number;
  Name: ESystemFuzzyNames;
  Term_System_Key: number;
  Values: Array<ISystemDotValue>;
}

export interface ISystemDotValue {
  Key: number;
  Name: string;
  Term_Key: number;
  Value: IRuleDots;
}