export interface ITest {
  Key?: number;
  Name?: string;
  Test_Type_Key?: number;
  Questions?: Array<ITestQuestion>;
}

export interface ITestResponse {
  Disciplines: Array<number>;
  Name: string;
  Questions: Array<ITestQuestion>;
  Type: ITestType;
}

export interface ITestType {
  Key: number;
  Sh_Name: string;
  TName: string;
}

export interface ITestQuestion {
  Key?: number;
  questionPhoto?: string;  
  Header?: string;
  Answer?: Array<ITestQuestionAnswer>;
  Img: IImg;
}

export interface IImg {
  File: string | null;
  Key: number;
}

export interface ITestQuestionAnswer {
  Key?: number;
  Text: string;
  Question_Key?: number;
  Img_Key?: number;
  photo?: string;
  IsCorrect: boolean;
}

export interface ITestUserAnswer {
  id: number;
  answers: Array<ITestQuestionUserAnswer>;
}

export interface ITestQuestionUserAnswer {
  id: number;
  answerId: number;
}

export interface ITestQuestionUpdate {
  key: number;
  header: string;
  fileKey?: string | null;
}

export interface ITestAnswerUpdate {
  text: string;
  isCorrect: boolean;
  key: number;
  isNew?: boolean;
}

export interface IUpdateImage {
  key: number;
  fileKey: string;
}

export interface IAddImage {
  model: any;
  fileKey: string;
}