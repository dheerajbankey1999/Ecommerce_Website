import { IsOptional, IsArray, IsString, ValidateNested, IsNumber, isInt, IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSizeCategoryDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  categoryId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  categoryName?: string;
}
