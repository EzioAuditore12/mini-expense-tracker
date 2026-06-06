import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

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
      toast.error('Registration Failed', {
        description: error.message,
      });
    },
  });
}
