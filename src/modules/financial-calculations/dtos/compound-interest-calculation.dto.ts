import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, IsNotEmpty, IsDecimal } from 'class-validator';

export class CompoundInterestDto {
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  @ApiProperty()
  readonly principal: number;

  @IsNotEmpty()
  @IsDecimal()
  @ApiProperty()
  readonly annualRate: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  @ApiProperty()
  readonly periods: number;
}
