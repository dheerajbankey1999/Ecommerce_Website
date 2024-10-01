import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional, ValidateNested, IsArray } from 'class-validator';
 

export class CreataTag{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  tagName: string;
}
