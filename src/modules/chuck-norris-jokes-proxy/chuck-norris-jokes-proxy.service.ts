import { Injectable } from '@nestjs/common';
import { GetRandomJokeQueryParamsDto } from './dtos/get-random-joke-query-params.dto';
import { CHUCK_NORRIS_API_URL } from './chuck-norris-api/chuck-norris-api-url.constants';
import { ChuckNorrisApiResponse } from './chuck-norris-api/chuck-norris-api-response.type';
import { ChuckNorrisJokesProxyEntity } from './entities/chuck-norris-jokes-proxy.entity';

@Injectable()
export class ChuckNorrisJokesProxyService {
  async getJokeByQuery(query: string) {
    const chuckNorrisUrl = new URL('/jokes/search', CHUCK_NORRIS_API_URL);

    chuckNorrisUrl.searchParams.set('query', query);
    const result = await fetch(chuckNorrisUrl.toString());
    const data = (await result.json()) as {
      total: number;
      result: ChuckNorrisApiResponse[];
    };
    const formattedData = data.result.map((joke) => {
      return new ChuckNorrisJokesProxyEntity(joke);
    });
    return formattedData;
  }

  async getRandomJoke(queryParams: GetRandomJokeQueryParamsDto) {
    const { category = '', query = '' } = queryParams;

    if (query) return await this.getJokeByQuery(query);

    const chuckNorrisUrl = new URL('/jokes/random', CHUCK_NORRIS_API_URL);
    if (category) chuckNorrisUrl.searchParams.set('category', category);

    const result = await fetch(chuckNorrisUrl.toString());
    const data = (await result.json()) as ChuckNorrisApiResponse;
    const formattedData = new ChuckNorrisJokesProxyEntity(data);
    return formattedData;
  }

  async getJokesCategories() {
    const chuckNorrisUrl = new URL('/jokes/categories', CHUCK_NORRIS_API_URL);
    const response = await fetch(chuckNorrisUrl.toString());
    const data = (await response.json()) as string[];
    return data;
  }
}
