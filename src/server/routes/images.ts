import type { NextFunction, Request, Response } from 'express';
import type { TUserRequestDto, TUserResponseDto } from '../serverTypes';
import type { TImageGenerateMessage, TChatImage } from '../../types/types';
import { Router } from 'express';
import { isApiError, RouteError } from '../serverTypes';
import { openAI } from '../openaiAPI';

export const imagesRouter = Router();
imagesRouter.post(
  '/images',
  async (
    req: Request<any, any, TUserRequestDto<TImageGenerateMessage>, any, any>,
    res: Response<TUserResponseDto<TChatImage[]> | RouteError | string, any>,
    next: NextFunction,
  ) => {
    const { prompt } = req.body;

    if (!openAI.apiKey) {
      next(new RouteError(500, 'OpenAI API Key not configured.'));
    }

    if (!prompt) {
      next(new RouteError(400, 'Prompt is required.'));
    }

    try {
      const { data } = await openAI.images.generate(prompt);
      return res.status(200).json({
        role: 'assistant',
        content: data,
      });
    } catch (err) {
      if (err instanceof RouteError) {
        next(new RouteError(err.statusCode, err.message));
      } else if (isApiError(err)) {
        next(new RouteError(err.response.status, err.message));
      }
    }
  },
);
