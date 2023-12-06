import type { StoreDefinition } from 'pinia';
import type { TUserState, TUserGetters, TUserActions } from '@/types/types';
import type { Session, User } from '@supabase/supabase-js';
import { defineStore } from 'pinia';
import type { ExtendedUser } from '@/types/types';
import { useAIStore } from '@/stores/artificialIntelligence';
import { supabase } from '@/lib/supabase';

export const useUserStore: StoreDefinition<'user', TUserState, TUserGetters, TUserActions> = defineStore('user', {
  state(): TUserState {
    return {
      supabaseSession: null,
      apiCount: 0,
      isUpgrade: true,
    };
  },
  getters: {
    getSupabaseSession: (state: TUserState): Session | null => state.supabaseSession,
    getApiCount: (state: TUserState): number => state.apiCount,
    getIsUpgrade: (state: TUserState): boolean => state.isUpgrade,
    getUser: (state: TUserState): User | undefined => state.supabaseSession?.user,
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
    async singOut(): Promise<void> {
      await supabase.auth.signOut();
    },
    async updateApiCount(): Promise<void> {
      await this.userApiLimit();
    },
    async userApiLimit(): Promise<void> {
      const token = this.supabaseSession?.access_token;
      try {
        const response = await fetch('/api/user', {
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
    async stripeSubscription(): Promise<{ url: string }> {
      const response = await fetch('/api/stripe', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${this.supabaseSession?.access_token}`,
        },
      });
      const data = await response.json();
      return data as { url: string };
    },
    async stripeCheckSubscriptionStatus(): Promise<void> {
      const response = await fetch('/api/stripe-check-status', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${this.supabaseSession?.access_token}`,
        },
      });
      this.isUpgrade = await response.json();
    },
  },
});
