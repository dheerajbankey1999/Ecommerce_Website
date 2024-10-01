import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
 

export class CreateProductCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fieldName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fieldImage?: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  categoryId: number;

@ApiPropertyOptional()
  @IsOptional()
  @IsString()
  genderName?: string
}
