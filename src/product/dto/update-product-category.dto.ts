import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional } from 'class-validator';
import { ProductCategory } from '@prisma/client';

export class UpdateProductCategoryDto {

  @ApiProperty()
  @IsInt()
  productCategoryId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fieldName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  genderId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  genderName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fieldImage?: string;

}
