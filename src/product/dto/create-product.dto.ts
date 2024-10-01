import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import {CreateProductItemDto} from './create-product-item.dto';
import { CreateSizeOptionDto} from './size-option.dto'


export class CreateProductDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    productName: string;
  
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    productCategoryId: number;
  
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    productDescription?: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    brandName?: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    tagName?: string;
    

    @ApiPropertyOptional({ type: [CreateSizeOptionDto] })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateSizeOptionDto) 
    sizeOptions?: CreateSizeOptionDto[];

    
    @ApiPropertyOptional({ type: [CreateProductItemDto] })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateProductItemDto)
    productItems: CreateProductItemDto[];

  
  }