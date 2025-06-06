import express from 'express';
import userRouter from './user.js';
import accountRouter from './accounts.js';

const rootRouter = express.Router();

rootRouter.use('/user',userRouter);
rootRouter.use('/account',accountRouter);

export default rootRouter;