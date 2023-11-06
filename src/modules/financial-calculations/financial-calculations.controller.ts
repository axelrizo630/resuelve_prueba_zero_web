import { Body, Controller, Post } from '@nestjs/common';
import { FinancialCalculationsService } from './financial-calculations.service';
import { CompoundInterestDto } from './dtos/compound-interest-calculation.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('financial-calculations')
@ApiTags('Financial Calculations')
export class FinancialCalculationsController {
  constructor(
    private readonly financialCalculationsService: FinancialCalculationsService,
  ) {}

  @Post('compound-interest')
  @ApiOperation({
    summary: 'Calculate compound interest',
  })
  @ApiResponse({ status: 200, description: 'The calculation requested' })
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
