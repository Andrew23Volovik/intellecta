import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import type { Ref } from 'vue';
import { ref, onMounted, watchEffect } from 'vue';

export const useSupabaseUser = (supabaseClient?: SupabaseClient) => {
  const supabaseUser: Ref<User | null> = ref(null);
  const supabaseAccess: Ref<string | null> = ref(null);

  const setSupbaseUser = (session: Session): void => {
    if (session) {
      if (JSON.stringify(supabaseUser.value) !== JSON.stringify(session.user)) {
        supabaseUser.value = session.user;
        supabaseAccess.value = session.access_token;
      }
    } else {
      supabaseUser.value = null;
      supabaseAccess.value = null;
    }
  };

  supabaseClient?.auth.getSession().then(({ data: { session } }): void => {
    session && setSupbaseUser(session);
  });

  watchEffect(() => {
    console.log('supabaseUser', supabaseUser.value);
  });

  onMounted(async () => {
    if (supabaseClient) {
      const { data: authListener } = supabaseClient.auth.onAuthStateChange(async (event, newSession) => {
        newSession && setSupbaseUser(newSession);
      });

      return () => {
        authListener?.subscription.unsubscribe();
      };
    }
  });

  return {
    supabaseUser,
    supabaseAccess,
  };
};
