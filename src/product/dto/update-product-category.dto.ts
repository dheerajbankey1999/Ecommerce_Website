import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateProductCategoryDto {

  @ApiProperty()
  @IsInt()
  categoryId: number;

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
