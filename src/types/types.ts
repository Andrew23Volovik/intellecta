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
export type TChatMusic = {
  audio: string;
  spectrogram: string;
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

export type TAIStoreState = {
  conversationChat: TChatMessage<string>[];
  imageChat: TChatMessage<TChatImage[] | string>[];
  videoChat: TChatMessage<string[] | string>[];
  musicChat: TChatMessage<TChatMusic | string>[];
  codeChat: TChatMessage<string>[];
  init: boolean;
};

export type TAIStoreGetters = {
  getConversationChat: (state: TAIStoreState) => TChatMessage<string>[];
  getImageChat: (store: TAIStoreState) => TChatMessage<TChatImage[] | string>[];
  getVideoChat: (store: TAIStoreState) => TChatMessage<string[] | string>[];
  getMusicChat: (store: TAIStoreState) => TChatMessage<TChatMusic | string>[];
  getCodeChat: (store: TAIStoreState) => TChatMessage<string>[];
};

export type TAIStoreActions = {
  generateConversation(message: TChatMessage<string>): Promise<Error | undefined>;
  generateImage(message: TImageGenerateMessage): Promise<Error | undefined>;
  generateVideo(message: TChatMessage<string>): Promise<Error | undefined>;
  generateMusic(message: TChatMessage<string>): Promise<Error | undefined>;
  generateCode(message: TChatMessage<string>): Promise<Error | undefined>;
};
