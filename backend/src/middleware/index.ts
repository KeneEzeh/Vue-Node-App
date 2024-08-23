import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

interface UserRequest extends Request {
    ip: string;
  } 

  const limiter = new RateLimiterMemory({
    points: 5,
    duration: 60,
  });

  // HERE I AM USING THE RATE LIMITER FLEXIBLE LIBRARY TO LIMIT THE NUMBER OF REQUESTS A USER CAN MAKE TO THE API
export const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const userRequest = req as UserRequest;
    limiter.consume(userRequest.ip)
      .then(() => next())
      .catch(() => res.status(429).json({ message: 'Too Many Requests, Please try again later' }));
  };