import type { NextFunction, Request, Response } from 'express';
import type { TUserRequestDto, TUserResponseDto } from '../serverTypes';
import { Router } from 'express';
import { isApiError, RouteError } from '../serverTypes';
import { replicate } from '../replicateAPI';

export const videoRouter = Router();

const baseInstructionVideo =
  'anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351';
videoRouter.post(
  '/video',
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
      const data = await replicate.run(baseInstructionVideo, {
        input: { prompt },
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