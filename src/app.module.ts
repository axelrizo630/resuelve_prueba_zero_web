import { Module } from '@nestjs/common';
import type { RedisClientOptions } from 'redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FinancialCalculationsModule } from './modules/financial-calculations/financial-calculations.module';
import { ChuckNorrisJokesProxyModule } from './modules/chuck-norris-jokes-proxy/chuck-norris-jokes-proxy.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      isGlobal: true,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    FinancialCalculationsModule,
    ChuckNorrisJokesProxyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
