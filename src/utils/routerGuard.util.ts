import { useUserStore } from "src/stores/userStore";
import { RouteLocationNormalizedLoaded, Router } from "vue-router";

export class RouterGuardManager {
  static useAuthGuard(router: Router, route: RouteLocationNormalizedLoaded) {
    const store = useUserStore();
    if (!store.isLoggedIn) {
      router.push('/');
      return;
    }

    if (route.path.includes('/expert') && store.isStudent) {
      router.push('/courses')
      return;
    }

    if (route.path.includes('/courses') && route.params.id && !store.isStudent) {
      router.push('/courses');
      return;
    }

    if (route.path.includes('/operator') && store.isStudent) {
      router.push('/courses');
      return;
    }

    if (route.path === '/') {
      router.push('/courses');
    }
  }
}