import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional, ValidateNested, IsArray } from 'class-validator';
 

export class CreataBrand{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  brandName: string;
}
