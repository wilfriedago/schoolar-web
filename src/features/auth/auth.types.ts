import type { Nullable } from '@/shared/types';

export type Authenticated = {
  id: string | number;
  email: string;
  firstName?: string;
  lastName?: string;
  emailVerifiedAt: Nullable<string>;
};

export type AuthResponse = {
  user: Authenticated;
  token: string;
};
