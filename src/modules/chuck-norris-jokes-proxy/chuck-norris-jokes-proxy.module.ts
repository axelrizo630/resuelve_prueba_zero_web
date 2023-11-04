import { Module } from '@nestjs/common';
import { ChuckNorrisJokesProxyService } from './chuck-norris-jokes-proxy.service';
import { ChuckNorrisJokesProxyController } from './chuck-norris-jokes-proxy.controller';
import { ChuckNorrisJokesProxyExitingCategory } from './validations/chuck-norris-jokes-proxy.existing-category';

@Module({
  controllers: [ChuckNorrisJokesProxyController],
  providers: [
    ChuckNorrisJokesProxyExitingCategory,
    ChuckNorrisJokesProxyService,
  ],
})
export class ChuckNorrisJokesProxyModule {}
