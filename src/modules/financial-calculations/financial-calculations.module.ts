import { Module } from '@nestjs/common';
import { FinancialCalculationsService } from './financial-calculations.service';
import { FinancialCalculationsController } from './financial-calculations.controller';

@Module({
  controllers: [FinancialCalculationsController],
  providers: [FinancialCalculationsService],
})
export class FinancialCalculationsModule {}
