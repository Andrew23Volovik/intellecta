import type { User } from '@supabase/supabase-js';

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

export type TUserRequestDto<T> = {
  prompt: T;
};

export type TUserResponseDto<T> = {
  role: 'assistant';
  content: T;
};

export interface ExtendedUser extends User {
  apiCount: number;
}

export type TApiError = {
  message: string;
  response: {
    status: number;
    statusText: string;
  };
};

export function isApiError(err: TApiError | Error | unknown): err is TApiError {
  return typeof err === 'object' && err !== null && 'response' in err && 'message' in err;
}
