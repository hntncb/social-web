import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRouter from './features/users/user.route.js';
import authRouter from './features/auth/auth.route.js';
import postRouter from './features/posts/post.route.js';
import commentRouter from './features/comment/comment.route.js';
import { notFoundHandler } from './middleware/notFoundHandler.middleware.js';
import { errorHandler } from './middleware/error.middleware.js';
import swaggerSpec from './config/swagger.js';
import swaggerUi from 'swagger-ui-express';

const app = express();

const vite_port = process.env.VITE_APP_URL || 5173;

app.use(
  cors({
    origin: `${vite_port}`,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(express.json());

app.use(
  '/api',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { swaggerOptions: { persistAuthorization: true } }),
);

app.use('/v1/users', userRouter);

app.use('/v1/auth', authRouter);

app.use('/v1/posts', postRouter);

app.use('/v1/comments', commentRouter);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
