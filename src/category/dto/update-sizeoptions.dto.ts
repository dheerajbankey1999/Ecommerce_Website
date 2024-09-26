import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
 
  export class UpdateSizeOptionsDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
     sizeId?: number; 
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    sizeName?: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    sortOrder?: number;
  }
  
  