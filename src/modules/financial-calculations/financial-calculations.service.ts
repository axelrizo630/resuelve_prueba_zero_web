import { Injectable } from '@nestjs/common';
import { CompoundInterestDto } from './dtos/compound-interest-calculation.dto';
import { MONTHS_IN_YEAR } from './constants/time-periods';

@Injectable()
export class FinancialCalculationsService {
  compoundInterest(
    compoundInterestCalculationDto: CompoundInterestDto,
  ): number {
    const { principal, annualRate, periods } = compoundInterestCalculationDto;
    const result =
      principal * (1 + annualRate / MONTHS_IN_YEAR) ** MONTHS_IN_YEAR * periods;
    return result;
  }
}
