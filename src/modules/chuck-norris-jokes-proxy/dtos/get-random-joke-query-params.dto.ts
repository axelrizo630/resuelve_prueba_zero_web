import { IsOptional, IsString, Validate } from 'class-validator';
import { ChuckNorrisJokesProxyExitingCategory } from '../validations/chuck-norris-jokes-proxy.existing-category';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetRandomJokeQueryParamsDto {
  @IsString()
  @IsOptional()
  @Validate(ChuckNorrisJokesProxyExitingCategory)
  @ApiPropertyOptional()
  category?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @ApiPropertyOptional()
  query?: string;
}
