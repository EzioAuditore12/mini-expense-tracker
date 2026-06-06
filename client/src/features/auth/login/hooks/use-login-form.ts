import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

import { loginApi } from '../api/login.api';

import { useAuthStore } from '@/store/auth';

export function useLoginForm() {
  const { setUserTokens, setUserDetails } = useAuthStore((state) => state);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setUserDetails(data.user);
      setUserTokens(data.tokens);

      navigate({ to: '/', replace: true });
    },
    onError: (error) => {
      toast.error('Login Failed', {
        description: error.message,
      });
    },
  });
}
