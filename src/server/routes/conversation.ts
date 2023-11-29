import type { NextFunction, Request, Response } from 'express';
import type { TUserRequestDto, TUserResponseDto } from '../serverTypes';
import { Router } from 'express';
import { isApiError, RouteError } from '../serverTypes';
import { openAI } from '../openaiAPI';

export const conversationRouter = Router();

const baseInstructionConversation = {
  role: 'system',
  content: 'You must answer only in markdown.',
} as { role: 'system'; content: string };
conversationRouter.post(
  '/conversation',
  async (
    req: Request<any, any, TUserRequestDto<string>, any, any>,
    res: Response<TUserResponseDto<string> | RouteError | string, any>,
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
