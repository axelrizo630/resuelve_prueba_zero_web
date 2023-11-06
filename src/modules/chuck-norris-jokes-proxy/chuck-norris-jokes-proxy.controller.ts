import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ChuckNorrisJokesProxyService } from './chuck-norris-jokes-proxy.service';
import { GetRandomJokeQueryParamsDto } from './dtos/get-random-joke-query-params.dto';
import { ChuckNorrisJokesProxyEntity } from './entities/chuck-norris-jokes-proxy.entity';

@Controller('chuck-norris-jokes')
@ApiTags('Chuck Norris Jokes Proxy')
export class ChuckNorrisJokesProxyController {
  constructor(
    private readonly chuckNorrisJokesProxyService: ChuckNorrisJokesProxyService,
  ) {}

  @Get('random')
  @ApiOperation({
    summary: 'Get a random Joke using optional query OR category',
  })
  @ApiQuery({ name: 'category', required: false })
  @ApiHeader({
    name: 'x-api-key',
    description: 'The API KEY to access the Chuck Norris Jokes Proxy',
  })
  @ApiResponse({
    status: 200,
    description: 'The random Joke or Jokes depends on query query param',
    type: ChuckNorrisJokesProxyEntity,
  })
  @ApiResponse({
    status: 429,
    description: 'The user reached the limit of requests per hour',
  })
  @ApiResponse({
    status: 403,
    description: 'There is a error with the API KEY provided',
  })
  async getRandomJoke(
    @Query() query: GetRandomJokeQueryParamsDto,
  ): Promise<ChuckNorrisJokesProxyEntity | ChuckNorrisJokesProxyEntity[]> {
    return await this.chuckNorrisJokesProxyService.getRandomJoke(query);
  }

  @Get('categories')
  @ApiOperation({
    summary: 'Get all the categories available for jokes',
  })
  @ApiResponse({
    status: 200,
    description: 'The categories available for jokes',
  })
  async getJokesCategories() {
    return await this.chuckNorrisJokesProxyService.getJokesCategories();
  }
}
