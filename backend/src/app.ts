import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import cron from 'node-cron';
import { createAutobots } from './controller';
import appRouter from './routes';
import cors from 'cors';
import { rateLimiterMiddleware } from './middleware';
import swaggerDocs from './swagger';


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const port = process.env.PORT ?? 5000;

swaggerDocs(app, port);

app.use(rateLimiterMiddleware);

app.use('/api',appRouter);

app.use('/', (req: Request, res: Response) => {
    return res.status(200).json({message: 'Welcome to the TweetAI backend, feel free to checkout the endpoints!'});
});


// IN OTHER TO CREATE AUTOBOTS EVERY HOUR, I USED THE CRON JOB LIBRARY TO SCHEDULE THE TASK
cron.schedule('0 * * * *', createAutobots);


export default app;
