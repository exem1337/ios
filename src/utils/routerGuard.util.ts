import { useUserStore } from "src/stores/userStore";
import { Router } from "vue-router";

export class RouterGuardManager {
  static useAuthGuard(router: Router) {
    const store = useUserStore();
    if (!store.isLoggedIn) {
      router.push('/');
    }
  }
}