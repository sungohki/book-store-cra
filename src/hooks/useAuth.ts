import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const { storeLogin, storeLogout, isLoggedIn } = useAuthStore();

  return;
};
