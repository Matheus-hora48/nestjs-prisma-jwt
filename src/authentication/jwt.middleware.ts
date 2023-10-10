import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (token) {
      try {
        const user = await this.authService.verifyToken(token);
        req['user'] = user;

        return next();
      } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    }

    return res.status(401).json({ message: 'Unauthorized' });
  }
}
