import type { User } from '@supabase/supabase-js';

export interface IRouteError {
  statusCode: number;
  context?: string;
}

export class RouteError extends Error implements IRouteError {
  statusCode: number;
  context?: string;
  constructor(statusCode: number, msg: string, context?: string) {
    super(msg);
    this.statusCode = statusCode;
    this.context = context;

    Object.setPrototypeOf(this, RouteError.prototype);
  }
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
