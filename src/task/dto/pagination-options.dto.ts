import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive, Max, Min } from 'class-validator';

export class PaginationOptionsDto {
  @IsInt()
  @Min(1)
  @IsPositive()
  @IsOptional()
  @ApiProperty({
    type: 'integer',
    minimum: 1,
    required: false
  })
  page: number;

  @IsInt()
  @Min(5)
  @Max(25)
  @IsPositive()
  @IsOptional()
  @ApiProperty({
    type: 'integer',
    minimum: 1,
    maximum: 25,
    required: false
  })
  limit: number;
}
