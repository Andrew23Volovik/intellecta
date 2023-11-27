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
export type TChatImage = {
  url?: string;
};
export type TChatMessage<T> = {
  role: TChatRoles;
  content: T;
};

export type TImageGenerateMessage = {
  prompt: string;
  model?: 'dall-e-2' | 'dall-e-3' | null;
  n?: number | null;
  size?: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792' | null;
};

export type TBaseError = {
  error: string;
};

export function isBaseError(data: TBaseError): data is TBaseError {
  return typeof data === 'object' && data !== null && 'error' in data;
}

export type AIStoreState = {
  conversationChat: TChatMessage<string>[];
  imageChat: TChatMessage<TChatImage[] | string>[];
  videoChat: TChatMessage<string[] | string>[];
  init: boolean;
};

export type AIStoreGetters = {
  getConversationChat: (state: AIStoreState) => TChatMessage<string>[];
  getImageChat: (store: AIStoreState) => TChatMessage<TChatImage[] | string>[];
  getVideoChat: (store: AIStoreState) => TChatMessage<string[] | string>[];
};

export type AIStoreActions = {
  generateConversation(message: TChatMessage<string>): Promise<void>;
  generateImage(message: TImageGenerateMessage): Promise<void>;
  generateVideo(message: TChatMessage<string>): Promise<Error | undefined>;
};
