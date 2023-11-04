import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  // ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ChuckNorrisJokesProxyService } from '../chuck-norris-jokes-proxy.service';

@ValidatorConstraint({
  name: 'ChuckNorrisJokesProxyExitingCategory',
  async: true,
})
@Injectable()
export class ChuckNorrisJokesProxyExitingCategory
  implements ValidatorConstraintInterface
{
  constructor(
    private readonly chuckNorrisJokesProxyService: ChuckNorrisJokesProxyService,
  ) {}

  async validate(value: string): Promise<boolean> {
    const categories =
      await this.chuckNorrisJokesProxyService.getJokesCategories();
    return categories.includes(value);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Category ${validationArguments.value} doesn't exist`;
  }
}
