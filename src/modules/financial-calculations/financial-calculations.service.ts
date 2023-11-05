import { Injectable } from '@nestjs/common';
import { CompoundInterestDto } from './dtos/compound-interest-calculation.dto';

const CAPITALIZATION_PERIODS = 1;
@Injectable()
export class FinancialCalculationsService {
  compoundInterest(
    compoundInterestCalculationDto: CompoundInterestDto,
  ): number {
    const { principal, annualRate, periods } = compoundInterestCalculationDto;
    const result =
      principal *
      (1 + Number(annualRate) / CAPITALIZATION_PERIODS) **
        (CAPITALIZATION_PERIODS * periods);
    return result;
  }
}
