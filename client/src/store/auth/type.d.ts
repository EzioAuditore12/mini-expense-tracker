import type { User } from '@/features/common/schemas/user.schema';
import type { Tokens } from '@/features/common/schemas/token.schema';

export interface AuthStore {
  user: User | null;
  tokens: Tokens | null;
  setUserDetails(data: User): void;
  setUserTokens(data: Tokens): void;
  logout: () => void;
}
