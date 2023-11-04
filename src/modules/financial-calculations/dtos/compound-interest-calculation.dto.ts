import { IsInt, Min, IsNotEmpty, IsDecimal } from 'class-validator';

export class CompoundInterestDto {
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  readonly principal: number;

  @IsNotEmpty()
  @IsDecimal()
  readonly annualRate: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  readonly periods: number;
}
