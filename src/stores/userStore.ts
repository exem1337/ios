import { defineStore } from 'pinia';
import { IUser } from 'src/models/user.model';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
  }),
  getters: {},
  actions: {
    setUser(user: IUser) {
      this.user = user;
    },
  },
});
