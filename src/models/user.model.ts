import { EUserRole } from 'src/enums/userTypes.enum';
import { IRuleDots } from './fuzzy.model';
import { ERuleResultLevels } from 'src/enums/rule.enum';

export interface IUser {
  id: number;
  name: string;
  role: IUserRole;
}

export interface IUserRole {
  Key: number;
  Name: EUserRole;
  ShName: string;
}

export interface IFuzzyResult {
  graphs: Array<IRuleDots>;
  result: number;
  resultTerm: string;
  resultFunc: IRuleDots;
}

export interface IUserStatus {
  Answer_Time: number;
  Correct_Percentage: number;
  DateGot: string;
  Result: number;
  Status: ERuleResultLevels;
  Test_Difficulty: number;
  Topic_Time: number;
}