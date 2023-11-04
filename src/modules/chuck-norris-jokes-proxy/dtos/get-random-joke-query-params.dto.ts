import { IsOptional, IsString, Validate } from 'class-validator';
import { ChuckNorrisJokesProxyExitingCategory } from '../validations/chuck-norris-jokes-proxy.existing-category';

export class GetRandomJokeQueryParamsDto {
  @IsString()
  @IsOptional()
  @Validate(ChuckNorrisJokesProxyExitingCategory)
  category?: string;

  @IsString()
  @IsOptional()
  query?: string;
}
