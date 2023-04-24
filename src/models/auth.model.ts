import { IUserRole } from "./user.model";

export interface IAuthResponse {
  TTL: string;
  Token: string;
  UserData: IUserData;
}

export interface IUserData {
  Email: string;
  UserKey: number;
  Verify: string;
  Role: IUserRole;
}

export interface IUserInfoResponse {
  phys: IUserInfoResponsePhys;
  reg: IUserInfoResponseReg;
}

export interface IAllUsersInfoItem {
  Email: string;
  Key: number;
  Login: string;
  Name: string;
  Reg_Date: string;
  Role_Key: number;
  Patronymic: string;
  Role_Name: string;
  Surname: string;
}

export interface IUserInfoResponsePhys {
  Email: string;
  Interface_Type: number;
  Key: number;
  Name: string;
  Patronymic: string;
  Rating: string;
  Role_Key: number;
  Role: IUserRole;
  Sex_key: number;
  Surname: string;
}

export interface IUserInfoResponseReg {
  Login: string;
  PassWord: string;
  Phys_Key: number;
  Reg_Date: string;
}