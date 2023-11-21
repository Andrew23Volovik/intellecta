import type { AuthError } from '@supabase/supabase-js';

export type ClassesRecord = Record<string, boolean>;

export interface IAuthUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export type TFormFieldValidations = {
  email: string | undefined;
  password: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
};
export type TSearchValidations = {
  prompt: string | undefined;
};

export type AuthStoreState = Record<any, never>;
export type AuthStoreGetters = Record<any, never>;

export interface IAuthStoreActions {
  supabaseUserSingUp({ email, password }: IAuthUser): Promise<AuthError | undefined>;
  supabaseUserSingIn({ email, password }: Omit<IAuthUser, 'firstName' | 'lastName'>): Promise<AuthError | undefined>;
  supabaseUserSingInWithOAuth(type: 'google' | 'github'): Promise<AuthError | undefined>;
}

export type TChatRoles = 'user' | 'assistant' | 'system';
export type TChatMessage = {
  role: TChatRoles;
  content: string;
};

export type OpenAIStoreState = {
  conversationChat: TChatMessage[];
  init: boolean;
};

export type OpenAIStoreGetters = {
  getOpenAIConversationChat: (state: OpenAIStoreState) => TChatMessage[];
};

export type OpenAIStoreActions = {
  openAIConversation(message: TChatMessage): Promise<void>;
};
