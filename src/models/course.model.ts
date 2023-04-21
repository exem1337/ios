export interface ICourse {
  Key: number;
  Name: string;
  ShName: string;
}

export interface IDisciplineTopic {
  Discip_Key: number;
  Diff_Level_Key: number;
  File_Link: string;
  Material_Key: number;
  Test_Key: number;
  Name: string;
  Number: number;
  TopicKey: number;
  Topic_Weight: number;
  Key: number;
}

export interface IDiscipline {
  Entry_Test_Key: number;
  Faculty_Key: number;
  Key: number;
  Labor_Document_Key: number;
  Name: string;
  ShName: string;
}

export interface IDisciplineDifficulty {
  Key: number;
  Name: string;
  Value?: string;
}

export interface IDisciplineUser {
  Key: number;
  Name: string;
  Patronymic: string;
  Role_key: number;
  Role_Name: string;
  Surname: string;
}

export interface ICourseResult {
  Date_Submitted: string;
  Difficulty: string;
  Name: string;
  Patronymic: string;
  Result: string;
  Surname: string;
  TestName: string;
}