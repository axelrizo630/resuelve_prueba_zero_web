import { Controller, Get, Query } from '@nestjs/common';
import { ChuckNorrisJokesProxyService } from './chuck-norris-jokes-proxy.service';
import { GetRandomJokeQueryParamsDto } from './dtos/get-random-joke-query-params.dto';

@Controller('chuck-norris-jokes')
export class ChuckNorrisJokesProxyController {
  constructor(
    private readonly chuckNorrisJokesProxyService: ChuckNorrisJokesProxyService,
  ) {}

  @Get('random')
  async getRandomJoke(@Query() body: GetRandomJokeQueryParamsDto) {
    return await this.chuckNorrisJokesProxyService.getRandomJoke(body);
  }

  @Get('categories')
  async getJokesCategories() {
    return await this.chuckNorrisJokesProxyService.getJokesCategories();
  }
}
