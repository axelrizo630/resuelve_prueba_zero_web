import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { NextFunction, Request, Response } from 'express';
import { DateTime } from 'luxon';
import { HOUR } from 'src/constants/time-measures';
import { UsersService } from 'src/modules/users/users.service';
import { REQUESTS_LIMIT } from '../constants/api-keys.limit-requests';
import { ApiKeyRedisValue } from '../types/api-key-redis-value.type';
import { getCachedApiKeyFromUserId } from '../utils/getCacheApiKeyFromRedis';

@Injectable()
export class ExpressApiKeysTokenLimitRequests implements NestMiddleware {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private usersService: UsersService,
  ) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || Array.isArray(apiKey)) {
      throw new ForbiddenException('Need api key');
    }

    const user = await this.usersService.findUserByApiKey(apiKey);
    if (!user) throw new ForbiddenException('Invalid api key');

    const redisUserIdKey = getCachedApiKeyFromUserId(user.id);

    const apiKeyValueFromRedis =
      await this.cacheManager.get<ApiKeyRedisValue>(redisUserIdKey);
    const expireDate =
      apiKeyValueFromRedis && DateTime.fromISO(apiKeyValueFromRedis.expireDate);

    if (
      apiKeyValueFromRedis.remainingRequests === null ||
      (expireDate && expireDate < DateTime.local())
    ) {
      const apiKeyRedisValue: ApiKeyRedisValue = {
        remainingRequests: REQUESTS_LIMIT,
        expireDate: DateTime.local().plus({ hour: 1 }).toISO(),
      };
      this.cacheManager.set(redisUserIdKey, apiKeyRedisValue, { ttl: HOUR });
      return next();
    }

    if (apiKeyValueFromRedis.remainingRequests < 1) {
      throw new HttpException(
        {
          statusbar: HttpStatus.TOO_MANY_REQUESTS,
          error: 'Too Many Requests',
          message:
            'Demasiadas solicitudes. Por favor, espere y vuelva a intentarlo más tarde.',
        },
        429,
      );
    }

    const apiKeysUsagesCount = apiKeyValueFromRedis.remainingRequests - 1;
    const apiKeyRedisValue: ApiKeyRedisValue = {
      remainingRequests: apiKeysUsagesCount,
      expireDate: apiKeyValueFromRedis.expireDate,
    };
    this.cacheManager.set(redisUserIdKey, apiKeyRedisValue, { ttl: HOUR });

    return next();
  }
}
