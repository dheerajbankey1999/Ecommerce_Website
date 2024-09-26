import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, ValidateNested, IsArray, IsNotEmpty } from 'class-validator';
 

// Product Item DTO
export class CreateProductItemDto {
  @ApiProperty()
  @IsInt()
  originalPrice?: number; // This field is now optional

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  salePrice?: number; // This field is optional

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  productCode?: number; // This field is optional

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  colourName?: string; // This field is optional

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
   sizeName?: string; // This field is optional

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
   styleName?: string; // This field is optional

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
   necklineName?: string; // This field is optional

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sleeveName?: string; // This field is optional

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  seasonName?: string; // This field is optional

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lengthName?: string; // This field is optional

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bodyName?: string; // This field is optional

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  dressName?: string ;
}
