import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateSizeOptionDto {
@ApiProperty()
  @IsString()
  sizeName: string;

  @ApiProperty()
  @IsInt()
  sortOrder: number;
}
