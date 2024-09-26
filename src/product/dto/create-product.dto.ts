import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import {CreateProductItemDto} from './create-product-item.dto';

export class CreateProductDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    productName: string;
  
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    categoryId: number;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    brandName: number;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    productDescription: string;
  
    @ApiProperty({ type: [CreateProductItemDto] })
    @ValidateNested({ each: true })
    @Type(() => CreateProductItemDto)
    productItems: CreateProductItemDto[];
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    tagName?: string;
  
  }