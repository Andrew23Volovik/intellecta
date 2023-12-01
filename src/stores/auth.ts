import type { AuthError } from '@supabase/supabase-js';
import type { StoreDefinition } from 'pinia';
import type { TAuthStoreActions, TAuthUser, TAuthStoreState, TAuthStoreGetters } from '@/types/types';
import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabase';

export const useAuthStore: StoreDefinition<'auth', TAuthStoreState, TAuthStoreGetters, TAuthStoreActions> = defineStore(
  'auth',
  {
    state() {
      return {};
    },
    getters: {},
    actions: {
      async supabaseUserSingUp({ email, password, firstName, lastName }: TAuthUser): Promise<AuthError | undefined> {
        try {
          const { error }: { error: AuthError | null } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
              data: {
                firstName,
                lastName,
              },
            },
          });

          if (error) return error;
        } catch (e) {
          console.log(e);
        }
      },
      async supabaseUserSingIn({
        email,
        password,
      }: Omit<TAuthUser, 'firstName' | 'lastName'>): Promise<AuthError | undefined> {
        try {
          const { error }: { error: AuthError | null } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });

          if (error) return error;
        } catch (e) {
          console.log(e);
        }
      },
      async supabaseUserSingInWithOAuth(type: 'google' | 'github'): Promise<AuthError | undefined> {
        try {
          const { error }: { error: AuthError | null } = await supabase.auth.signInWithOAuth({
            provider: type,
            options: {
              redirectTo: 'http://localhost:5173/app/dashboard',
            },
          });

          if (error) return error;
        } catch (e) {
          console.log(e);
        }
      },
    },
  },
);
