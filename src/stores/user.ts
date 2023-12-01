import type { StoreDefinition } from 'pinia';
import type { TUserState, TUserGetters, TUserActions } from '@/types/types';
import type { Session } from '@supabase/supabase-js';
import { defineStore } from 'pinia';
import type { ExtendedUser } from '@/server/types';
import { useAIStore } from '@/stores/artificialIntelligence';
import { supabase } from '@/lib/supabase';

export const useUserStore: StoreDefinition<'user', TUserState, TUserGetters, TUserActions> = defineStore('user', {
  state(): TUserState {
    return {
      supabaseSession: null,
      apiCount: 0,
    };
  },
  getters: {
    getSupabaseSession: (state: TUserState): Session | null => state.supabaseSession,
    getApiCount: (state: TUserState): number => state.apiCount,
  },
  actions: {
    setSupabaseSession(session: Session): void {
      const { setAccessToken } = useAIStore();
      if (session) {
        if (JSON.stringify(this.supabaseSession) !== JSON.stringify(session)) {
          this.supabaseSession = session;
          setAccessToken(session.access_token);
        } else {
          this.supabaseSession = null;
          setAccessToken('');
        }
      }
    },
    async initSupabaseSession(): Promise<() => void> {
      const { data: authLisener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
        newSession && this.setSupabaseSession(newSession);
      });

      return () => {
        authLisener?.subscription.unsubscribe();
      };
    },
    async updateApiCount(): Promise<void> {
      await this.userApiLimit();
    },
    async userApiLimit(): Promise<void> {
      const token = this.supabaseSession?.access_token;
      try {
        const response = await fetch('http://localhost:3000/api/user', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = (await response.json()) as ExtendedUser;
        this.apiCount = data.apiCount;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
