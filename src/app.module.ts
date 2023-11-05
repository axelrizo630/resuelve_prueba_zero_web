import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { ApiKeysModule } from './modules/api-keys/api-keys.module';
import { ExpressApiKeysTokenLimitRequests } from './modules/api-keys/middleware/api-keys.express.token-limit-requests';
import { AuthModule } from './modules/auth/auth.module';
import { ChuckNorrisJokesProxyModule } from './modules/chuck-norris-jokes-proxy/chuck-norris-jokes-proxy.module';
import { DatabaseModule } from './modules/database/database.module';
import { FinancialCalculationsModule } from './modules/financial-calculations/financial-calculations.module';
import { UsersModule } from './modules/users/users.module';
import { JwtTokenModule } from './modules/jwt-token/jwt-token.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      isGlobal: true,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    FinancialCalculationsModule,
    ChuckNorrisJokesProxyModule,
    UsersModule,
    AuthModule,
    ApiKeysModule,
    JwtTokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExpressApiKeysTokenLimitRequests)
      .forRoutes('chuck-norris-jokes/random');
  }
}
