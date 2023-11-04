import { Body, Controller, Post } from '@nestjs/common';
import { FinancialCalculationsService } from './financial-calculations.service';
import { CompoundInterestDto } from './dtos/compound-interest-calculation.dto';

@Controller('financial-calculations')
export class FinancialCalculationsController {
  constructor(
    private readonly financialCalculationsService: FinancialCalculationsService,
  ) {}

  @Post('compound-interest')
  compoundInterest(
    @Body() compoundInterestCalculationDto: CompoundInterestDto,
  ): {
    monto_total: number;
    detalles_solititud: {
      principal: number;
      tasa_anual: number;
      periodos: number;
    };
  } {
    const result = this.financialCalculationsService.compoundInterest(
      compoundInterestCalculationDto,
    );

    return {
      monto_total: result,
      detalles_solititud: {
        principal: compoundInterestCalculationDto.principal,
        tasa_anual: compoundInterestCalculationDto.annualRate,
        periodos: compoundInterestCalculationDto.periods,
      },
    };
  }
}
