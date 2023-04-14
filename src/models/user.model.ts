import { EUserRole } from 'src/enums/userTypes.enum';
import { IRuleDots } from './fuzzy.model';

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