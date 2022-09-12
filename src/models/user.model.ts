import { EUserTypes } from 'src/enums/userTypes.enum';

export interface IUser {
  id: number;
  name: string;
  lastName: string;
  patronymic: string;
  type: EUserTypes;
}
