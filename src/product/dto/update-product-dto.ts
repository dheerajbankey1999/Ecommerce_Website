import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateSizeOptionDto } from './update-sizeoptions.dto';
import { UpdateProductItemDto } from './update-productitem.dto';


export class UpdateProductDto {

  @ApiProperty()
  @IsInt()
  productId: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    productName?: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    productCategoryId?: number;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    productDescription?: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    brandName?: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    tagName?: string;
  
    @ApiPropertyOptional({ type: [UpdateSizeOptionDto] })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => UpdateSizeOptionDto)
     sizeOptions?: UpdateSizeOptionDto[];
  
    @ApiPropertyOptional({ type: [UpdateProductItemDto] })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => UpdateProductItemDto)
    productItems?: UpdateProductItemDto[];
  }
  