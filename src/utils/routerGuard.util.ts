import { useUserStore } from "src/stores/userStore";
import { RouteLocationNormalizedLoaded, Router } from "vue-router";

export class RouterGuardManager {
  static useAuthGuard(router: Router, route: RouteLocationNormalizedLoaded) {
    const store = useUserStore();
    if (!store.isLoggedIn) {
      router.push('/');
      return;
    }

    if (route.path === '/') {
      router.push('/courses');
    }
  }
}