import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateSizeOptionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sizeName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  sortOrder: number;
}
