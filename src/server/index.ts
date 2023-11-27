import type { Application } from 'express';
import express from 'express';
import cors from 'cors';
import { router as videoRoute } from './routes/video';
import { errorHandler } from './middleware/errors';

const app: Application = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', videoRoute);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
