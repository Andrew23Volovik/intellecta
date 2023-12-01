import type { NextFunction, Request, Response } from 'express';
import type { TUserRequestDto, TUserResponseDto } from '../types';
import { Router } from 'express';
import { isApiError, RouteError } from '../types';
import { openAI } from '../openaiAPI';
import { checkApiLimit, incrementApiLimit } from '../utils/index';

export const codeRouter = Router();

const baseInstructionConversation = {
  role: 'system',
  content:
    'You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.',
} as { role: 'system'; content: string };
codeRouter.post(
  '/code',
  async (
    req: Request<any, any, TUserRequestDto<string>, any, any>,
    res: Response<TUserResponseDto<string> | RouteError | string, any>,
    next: NextFunction,
  ) => {
    const user = res.locals.user;
    const { prompt } = req.body;

    if (!openAI.apiKey) {
      next(new RouteError(500, 'OpenAI API Key not configured.'));
    }

    if (!prompt) {
      next(new RouteError(400, 'Prompt is required.'));
    }

    const freeTrial = await checkApiLimit(user.id);
    if (!freeTrial) next(new RouteError(403, 'Free trial has expired. Please upgrade to pro.'));

    try {
      const completion = await openAI.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          baseInstructionConversation,
          {
            role: 'user',
            content: prompt,
          },
        ],
        stream: true,
      });

      res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
      });

      await incrementApiLimit(user.id);

      for await (const chunk of completion) {
        const [choice] = chunk.choices;
        if (choice.finish_reason) {
          return res.end();
        }
        const { content } = choice.delta;
        res.write(content);
      }
    } catch (err) {
      if (err instanceof RouteError) {
        next(new RouteError(err.statusCode, err.message));
      } else if (isApiError(err)) {
        next(new RouteError(err.response.status, err.message));
      }
    }
  },
);
