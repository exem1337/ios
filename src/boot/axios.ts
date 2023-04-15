import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { Cookies } from 'quasar';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

const api = axios.create({ 
  baseURL: 'http://localhost:8080/api',
  headers: {
    userKey: Cookies.get('UserKey'),
    token: Cookies.get('Token'),
    verify: Cookies.get('Verify'),
  }
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
