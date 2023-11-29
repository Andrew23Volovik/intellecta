import type { NextFunction, Request, Response } from 'express';
import type { TUserRequestDto, TUserResponseDto } from '../serverTypes';
import { Router } from 'express';
import { isApiError, RouteError } from '../serverTypes';
import { replicate } from '../replicateAPI';

export const musicRouter = Router();

const baseInstructionMusic = 'riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05';
musicRouter.post(
  '/music',
  async (
    req: Request<any, any, TUserRequestDto<string>, any, any>,
    res: Response<TUserResponseDto<string[]> | RouteError | string, any>,
    next: NextFunction,
  ) => {
    const { prompt } = req.body;

    if (!replicate.auth) {
      next(new RouteError(500, 'Replicate API Key not configured.'));
    }

    if (!prompt) {
      next(new RouteError(400, 'Prompt is required.'));
    }

    try {
      const data = await replicate.run(baseInstructionMusic, {
        input: { prompt_a: prompt },
      });
      return res.status(200).json({
        role: 'assistant',
        content: data,
      } as TUserResponseDto<string[]>);
    } catch (err) {
      if (err instanceof RouteError) {
        next(new RouteError(err.statusCode, err.message));
      } else if (isApiError(err)) {
        next(new RouteError(err.response.status, err.message));
      }
    }
  },
);
