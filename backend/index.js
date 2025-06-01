import express from 'express';
import rootRouter from './Routes/route.js';
import cors from 'cors';
const PORT=3000;

import dotenv from 'dotenv';
dotenv.config();
import connectDB from './DB/db.js';
connectDB();


const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1',rootRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});