import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateSizeOptionDto {

  @ApiProperty()
  @IsInt()
  optionId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sizeName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  sortOrder?: number;
}
