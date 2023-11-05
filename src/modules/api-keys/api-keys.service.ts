import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import { REQUESTS_LIMIT } from './constants/api-keys.limit-requests';
import { getCachedApiKeyFromUserId } from './utils/getCacheApiKeyFromRedis';
import { ApiKeyRedisValue } from './types/api-key-redis-value.type';

@Injectable()
export class ApiKeysService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly jwtTokenService: JwtTokenService,
  ) {}
  async getRemainingRequests(JWT: string) {
    const decodedToken = this.jwtTokenService.decodeToken(JWT);
    const remainingRequests = await this.cacheManager.get<ApiKeyRedisValue>(
      getCachedApiKeyFromUserId(decodedToken.id),
    );
    if (remainingRequests.remainingRequests === null) return REQUESTS_LIMIT;
    return remainingRequests.remainingRequests;
  }
}
