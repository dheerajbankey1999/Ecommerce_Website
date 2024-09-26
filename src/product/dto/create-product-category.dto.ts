import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional, ValidateNested, IsArray } from 'class-validator';
 

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
  sizeCategoryId: number;

@ApiPropertyOptional()
  @IsOptional()
  @IsString()
  genderName?: string
}
