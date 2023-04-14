import { Store } from 'pinia';
import { Cookies, Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { IBasedResponse } from 'src/models/api.model';
import { IAuthResponse, IUserInfoResponse } from 'src/models/auth.model';
import { IUser } from 'src/models/user.model';
import { useUserStore } from 'src/stores/userStore';
import { Router } from 'vue-router';

export class AuthManager {
  static async login(Email: string, Password: string, router: Router): Promise<void> {
    const store = useUserStore();

    const user = await api.post<IBasedResponse<IAuthResponse>>('/login', {
      Email,
      Password
    }).then((res) => res.data.Data);

    Cookies.set('Token', user.Token);
    Cookies.set('Verify', user.UserData.Verify);
    Cookies.set('UserKey', user.UserData.UserKey.toString());

    const userInfo = await api.get<IBasedResponse<IUserInfoResponse>>(
      `/userInfo/${user?.UserData?.UserKey}`,
      {
        headers: {
          Token: Cookies.get('Token'),
          Verify: Cookies.get('Verify'),
          UserKey: Cookies.get('UserKey'),
        }
      }
    ).then((res) => res.data.Data);
    
    if (!userInfo || !user) {
      router.push('/');
      
      Notify.create({
        color: 'blue-8',
        message: 'Произошла ошибка при авторизации',
        timeout: 1000,
      })
    }

    store.setUser({
      id: userInfo.phys.Key,
      name: `${userInfo.phys.Surname} ${userInfo.phys.Name} ${userInfo.phys.Patronymic}`,
      role: user.UserData.Role,
    })

    router.push('/courses');
  } 

  static logout(store: Store<'user', { user: IUser }>, router: Router): void {
    store.logout();
    Cookies.remove('Token');
    Cookies.remove('Verify');
    router.push('/');
  }

  static async refresh(router: Router) {
    const token = Cookies.get('Token');
    const verify = Cookies.get('Verify');
    const userKey = Cookies.get('UserKey');
    const store = useUserStore();

    if (token && verify && userKey) {
      const userInfo = await api.get<IBasedResponse<IUserInfoResponse>>(`/userInfo/${userKey}`).then((res) => res.data.Data);
    
      if (!userInfo) {
        router.push('/');
        
        Notify.create({
          color: 'blue-8',
          message: 'Произошла ошибка при авторизации',
          timeout: 1000,
        })

        return;
      }

      store.setUser({
        id: userInfo.phys.Key,
        name: `${userInfo.phys.Surname} ${userInfo.phys.Name} ${userInfo.phys.Patronymic}`,
        role: userInfo.phys.Role,
      })
    }
  }
}
