import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProductGenderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  genderName: string;
}
