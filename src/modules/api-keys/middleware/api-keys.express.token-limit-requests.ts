import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  ForbiddenException,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { NextFunction, Request, Response } from 'express';
import { HOUR } from 'src/constants/time-measures';
import { UsersService } from 'src/modules/users/users.service';

const REQUESTS_LIMIT = 5;

@Injectable()
export class ExpressApiKeysTokenLimitRequests implements NestMiddleware {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private usersService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || Array.isArray(apiKey))
      throw new ForbiddenException('Need api key');

    const user = await this.usersService.findUserByApiKey(apiKey);
    if (!user) throw new ForbiddenException('Invalid api key');

    const redisUserIdKey = user.id.toString();

    const userKeyUsages = await this.cacheManager.get<number>(redisUserIdKey);
    if (!userKeyUsages) {
      this.cacheManager.set(redisUserIdKey, 1, HOUR);
      next();
    }

    if (userKeyUsages > REQUESTS_LIMIT)
      throw new ForbiddenException(
        'Demasiadas solicitudes. Por favor, espere y vuelva a intentarlo más tarde.',
      );

    const apiKeysUsagesCount = userKeyUsages + 1;
    this.cacheManager.set(redisUserIdKey, apiKeysUsagesCount, HOUR);

    next();
  }
}
