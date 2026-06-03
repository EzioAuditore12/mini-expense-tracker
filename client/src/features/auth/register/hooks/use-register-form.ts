import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { registerApi } from '../api/register.api';

import { useAuthStore } from '@/store/auth';

export function useRegisterForm() {
  const { setUserTokens, setUserDetails } = useAuthStore((state) => state);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      setUserDetails(data.user);
      setUserTokens(data.tokens);

      navigate({ to: '/', replace: true });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
}
