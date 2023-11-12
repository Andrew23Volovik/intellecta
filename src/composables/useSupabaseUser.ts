import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import type { Ref } from 'vue';
import { ref, onMounted, watchEffect } from 'vue';

export const useSupabaseUser = (supabaseClient: SupabaseClient) => {
  const supabaseUser: Ref<User | null> = ref(null);

  const setSupbaseUser = (session: Session): void => {
    if (session) {
      if (JSON.stringify(supabaseUser.value) !== JSON.stringify(session.user)) {
        supabaseUser.value = session.user;
      }
    } else {
      supabaseUser.value = null;
    }
  };

  supabaseClient?.auth.getSession().then(({ data: { session } }): void => {
    session && setSupbaseUser(session);
  });

  watchEffect(() => {
    console.log('supabaseUser', supabaseUser.value);
  });

  onMounted(async () => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(async (event, newSession) => {
      newSession && setSupbaseUser(newSession);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  });

  return {
    supabaseUser,
  };
};
