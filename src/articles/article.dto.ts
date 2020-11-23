import { IsNotEmpty, MaxLength, IsString } from 'class-validator';

export class ArticleDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10000)
  text: string;
}
