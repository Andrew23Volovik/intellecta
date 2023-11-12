import type { LocationQuery } from 'vue-router';
import type { AuthError } from '@supabase/supabase-js';

export type ClassesRecord = Record<string, boolean>;

export interface IAuthUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export type AuthStoreState = Record<any, never>;
export type AuthStoreGetters = Record<any, never>;

export interface IAuthStoreActions {
  supabaseUserSingUp({ email, password }: IAuthUser): Promise<AuthError | undefined>;
  supabaseUserSingIn({ email, password }: Omit<IAuthUser, 'firstName' | 'lastName'>): Promise<AuthError | undefined>;
  supabaseUserSingInWithOAuth(type: 'google' | 'github'): Promise<AuthError | undefined>;
}

export interface IFormFieldValidations {
  email: string | undefined;
  password: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
}

export interface IRemoveHashReturn {
  path: string;
  query: LocationQuery;
  hash: string;
}
