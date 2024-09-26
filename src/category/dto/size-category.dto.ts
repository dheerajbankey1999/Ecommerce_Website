import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import {CreateSizeOptionDto} from './size-option.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSizeCategoryDto {
@ApiProperty()
  @IsString()
  categoryName: string;
 
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSizeOptionDto) 
  sizeOptions: CreateSizeOptionDto[];
}



