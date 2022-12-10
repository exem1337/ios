import { EUserTypes } from 'src/enums/userTypes.enum';
import { useUserStore } from 'stores/userStore';

export class AuthManager {
  static async login() {
    const store = useUserStore();
    store.setUser({
      id: 1,
      name: 'Андрей',
      lastName: 'Грак',
      patronymic: 'Викторович',
      type: EUserTypes.Expert,
    });
  }
}
