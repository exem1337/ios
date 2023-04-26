import { EUserRole } from 'src/enums/userTypes.enum';
import { useUserStore } from 'src/stores/userStore';
import { useRouter } from 'vue-router';

export class RouterGuard {
  static checkExpert() {
    const router = useRouter();
    const store = useUserStore();
    return store.user?.type === EUserRole.Expert || router.back();
  }
}
