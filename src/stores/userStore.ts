import { defineStore } from 'pinia';
import { EUserRole } from 'src/enums/userTypes.enum';
import { IUser } from 'src/models/user.model';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as IUser,
  }),
  getters: {
    getUser: (state) => state.user,
    isExpert: (state) => state.user.role.Name === EUserRole.Expert,
    isLoggedIn: (state) => !!state.user.id,
  },
  actions: {
    setUser(user: IUser) {
      this.user = user;
    },
    clearUser() {
      this.user = {} as IUser;
    },
  },
});
