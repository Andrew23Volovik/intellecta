import type { Application } from 'express';
import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errors';
import { userHandler } from './middleware/user';
import { router } from './routes/index';

const app: Application = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userHandler);
app.use('/api', router);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
