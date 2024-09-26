import { IsOptional, IsArray, IsString, ValidateNested, IsNumber, isInt, IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateSizeOptionsDto } from './update-sizeoptions.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSizeCategoryDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  sizeCatoryId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  categoryName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSizeOptionsDto)
  sizeOptions?: UpdateSizeOptionsDto[];
}
 