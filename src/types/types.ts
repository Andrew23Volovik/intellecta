import type { AuthError, Session } from '@supabase/supabase-js';

export type TClassesRecord = Record<string, boolean>;

export type TAuthUser = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type TFormFieldValidations = {
  email: string | undefined;
  password: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
};
export type TSearchValidations = {
  prompt: string | undefined;
};

export type TAuthStoreState = Record<any, never>;
export type TAuthStoreGetters = Record<any, never>;

export type TAuthStoreActions = {
  supabaseUserSingUp(user: TAuthUser): Promise<AuthError | undefined>;
  supabaseUserSingIn(user: Omit<TAuthUser, 'firstName' | 'lastName'>): Promise<AuthError | undefined>;
  supabaseUserSingInWithOAuth(type: 'google' | 'github'): Promise<AuthError | undefined>;
};

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
  accessToken: string;
  conversationChat: TChatMessage<string>[];
  imageChat: TChatMessage<TChatImage[] | string>[];
  videoChat: TChatMessage<string[] | string>[];
  musicChat: TChatMessage<TChatMusic | string>[];
  codeChat: TChatMessage<string>[];
  init: boolean;
};

export type TAIStoreGetters = {
  getConversationChat: (state: TAIStoreState) => TChatMessage<string>[];
  getImageChat: (state: TAIStoreState) => TChatMessage<TChatImage[] | string>[];
  getVideoChat: (state: TAIStoreState) => TChatMessage<string[] | string>[];
  getMusicChat: (state: TAIStoreState) => TChatMessage<TChatMusic | string>[];
  getCodeChat: (state: TAIStoreState) => TChatMessage<string>[];
};

export type TAIStoreActions = {
  setAccessToken(token: string): void;
  updateApi(): Promise<void>;
  generateConversation(message: TChatMessage<string>): Promise<Error | undefined>;
  generateImage(message: TImageGenerateMessage): Promise<Error | undefined>;
  generateVideo(message: TChatMessage<string>): Promise<Error | undefined>;
  generateMusic(message: TChatMessage<string>): Promise<Error | undefined>;
  generateCode(message: TChatMessage<string>): Promise<Error | undefined>;
};

export type TUserState = {
  supabaseSession: Session | null;
  apiCount: number;
};

export type TUserGetters = {
  getSupabaseSession: (state: TUserState) => Session | null;
  getApiCount: (state: TUserState) => number;
};

export type TUserActions = {
  setSupabaseSession(session: Session): void;
  initSupabaseSession(): Promise<() => void>;
  updateApiCount(): Promise<void>;
  userApiLimit(): Promise<void>;
};

export type TModalState = {
  isOpen: boolean;
};

export type TModalGetters = Record<any, any>;

export type TModalActions = {
  onOpen(): void;
  onClose(): void;
};
