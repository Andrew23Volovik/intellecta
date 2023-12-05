import type { NextFunction, Request, Response } from 'express';
import type { TUserRequestDto, TUserResponseDto } from '../types';
import { Router } from 'express';
import { isApiError, BaseError } from '../types';
import { replicate } from '../replicateAPI';
import { checkApiLimit, checkSubscription, incrementApiLimit } from '../utils/index';

export const musicRouter = Router();

const baseInstructionMusic = 'riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05';
musicRouter.post(
  '/music',
  async (
    req: Request<any, any, TUserRequestDto<string>, any, any>,
    res: Response<TUserResponseDto<string[]> | BaseError | string, any>,
    next: NextFunction,
  ) => {
    const user = res.locals.user;
    const { prompt } = req.body;

    if (!replicate.auth) {
      next(new BaseError(500, 'Replicate API Key not configured.'));
    }

    if (!prompt) {
      next(new BaseError(400, 'Prompt is required.'));
    }

    const freeTrial = await checkApiLimit(user.id);
    const isPro = await checkSubscription(user.id);
    if (!freeTrial && !isPro) next(new BaseError(403, 'Free trial has expired. Please upgrade to pro.'));

    try {
      const data = await replicate.run(baseInstructionMusic, {
        input: { prompt_a: prompt },
      });

      await incrementApiLimit(user.id);

      return res.status(200).json({
        role: 'assistant',
        content: data,
      } as TUserResponseDto<string[]>);
    } catch (err) {
      if (err instanceof BaseError) {
        next(new BaseError(err.statusCode, err.message));
      } else if (isApiError(err)) {
        next(new BaseError(err.response.status, err.message));
      }
    }
  },
);
