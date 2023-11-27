import type { NextFunction, Request, Response } from 'express';
import { RouteError } from '../serverTypes';

export const errorHandler = (err: Error, req: Request, res: Response<{ error: string }, any>, next: NextFunction) => {
  if (err instanceof RouteError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }
};
