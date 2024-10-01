import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsNotEmpty, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateProductItemDto {
  @ApiProperty()
  @IsInt()
  originalPrice: number; 

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  salePrice?: number;

  @ApiProperty()
  @IsInt()
  productCode: number; 

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl?: string; 
  
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  colourId?: number; 

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  styleId?: number; 

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  necklineId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  sleeveId?: number; 

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  seasonId?: number; 

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  lengthId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  bodyId?: number; 

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  dressId?: number; 

}
