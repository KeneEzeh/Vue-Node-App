import express, { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import cron from 'node-cron';
import { createAutobots } from './controller';
import appRouter from './routes';
import cors from 'cors';

const app = express();
app.use(cors());

interface UserRequest extends Request {
  ip: string;
} 
const limiter = new RateLimiterMemory({
  points: 5,
  duration: 60,
});

app.use((req: Request, res: Response, next: NextFunction) => {
    const userRequest = req as UserRequest;
  limiter.consume(userRequest.ip)
    .then(() => next())
    .catch(() => res.status(429).json({message:'Too Many Requests, Please try again later'}));
});

app.use('/', (req: Request, res: Response) => {
    res.send('Welcome to the TweetAI backend, feel free to checkout the endpoints!');
});

app.use('/api',appRouter);


cron.schedule('0 * * * *', createAutobots);

// app.listen(3000, () => console.log('Server running on port 3000'));

export default app;
