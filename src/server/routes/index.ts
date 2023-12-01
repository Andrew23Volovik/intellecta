import { Router } from 'express';
import { videoRouter } from './video';
import { musicRouter } from './music';
import { conversationRouter } from './conversation';
import { imagesRouter } from './images';
import { codeRouter } from './code';
import { userRouter } from './user';
export const router = Router();

router.use(userRouter);
router.use(conversationRouter);
router.use(imagesRouter);
router.use(videoRouter);
router.use(musicRouter);
router.use(codeRouter);
