import { IsNotEmpty, MaxLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(10000)
  text: string;
}
