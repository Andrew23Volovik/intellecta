import type { StoreDefinition } from 'pinia';
import type { TUserState, TUserGetters, TUserActions } from '@/types/types';
import type { Session } from '@supabase/supabase-js';
import { defineStore } from 'pinia';
import type { ExtendedUser } from '@/types/types';
import { useAIStore } from '@/stores/artificialIntelligence';
import { supabase } from '@/lib/supabase';

const baseUrl = import.meta.env.VITE_API_SERVER;

export const useUserStore: StoreDefinition<'user', TUserState, TUserGetters, TUserActions> = defineStore('user', {
  state(): TUserState {
    return {
      supabaseSession: null,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      accessToken: '',
      apiCount: 0,
      isUpgrade: true,
    };
  },
  getters: {
    getSupabaseSession: (state: TUserState): Session | null => state.supabaseSession,
    getApiCount: (state: TUserState): number => state.apiCount,
    getIsUpgrade: (state: TUserState): boolean => state.isUpgrade,
  },
  actions: {
    async setSupabaseSession(session: Session): Promise<void> {
      const { setAccessToken } = useAIStore();
      if (session) {
        if (JSON.stringify(this.supabaseSession) !== JSON.stringify(session)) {
          this.supabaseSession = session;
          this.firstName = session.user.user_metadata.firstName;
          this.lastName = session.user.user_metadata.lastName;
          this.email = session.user.email;
          this.accessToken = session.access_token;
          await setAccessToken(session.access_token);
        } else {
          this.supabaseSession = null;
          await setAccessToken('');
        }
      }
    },
    async initSupabaseSession(): Promise<() => void> {
      const { data: authLisener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
        newSession && (await this.setSupabaseSession(newSession));
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
      try {
        const response = await fetch(`${baseUrl}/api/user`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${this.accessToken}`,
          },
        });
        const data = (await response.json()) as ExtendedUser;
        this.apiCount = data.apiCount;
      } catch (e) {
        console.log(e);
      }
    },
    async stripeSubscription(): Promise<{ url: string }> {
      const response = await fetch(`${baseUrl}/api/stripe`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      const data = await response.json();
      return data as { url: string };
    },
    async stripeCheckSubscriptionStatus(): Promise<void> {
      const response = await fetch(`${baseUrl}/api/stripe-check-status`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      this.isUpgrade = await response.json();
    },
  },
});
