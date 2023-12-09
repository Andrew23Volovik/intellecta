import type { AuthError, Session, User } from '@supabase/supabase-js';

export interface IBaseError {
  statusCode: number;
  message: string;
  context?: string;
}

export class BaseError extends Error implements IBaseError {
  statusCode: number;
  message: string;
  context?: string;
  constructor(statusCode: number, message: string, context?: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.context = context;

    Object.setPrototypeOf(this, BaseError.prototype);
  }
}

export function isBaseError(err: any): err is BaseError {
  return typeof err === 'object' && err !== null && 'statusCode' in err && 'message' in err;
}

export interface ExtendedUser extends User {
  apiCount: number;
}

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
  firstName?: string;
  lastName?: string;
  email?: string;
  accessToken: string;
  apiCount: number;
  isUpgrade: boolean;
};

export type TUserGetters = {
  getSupabaseSession: (state: TUserState) => Session | null;
  getApiCount: (state: TUserState) => number;
  getIsUpgrade: (state: TUserState) => boolean;
};

export type TUserActions = {
  setSupabaseSession(session: Session): void;
  initSupabaseSession(): Promise<() => void>;
  singOut(): Promise<void>;
  updateApiCount(): Promise<void>;
  userApiLimit(): Promise<void>;
  stripeSubscription(): Promise<{ url: string }>;
  stripeCheckSubscriptionStatus(): Promise<void>;
};

export type TModalState = {
  isOpen: boolean;
};

export type TModalGetters = Record<any, any>;

export type TModalActions = {
  onOpen(): void;
  onClose(): void;
};
