import { IsInt, Min, IsNotEmpty } from 'class-validator';

export class CompoundInterestDto {
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  readonly principal: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  readonly annualRate: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  readonly periods: number;
}
