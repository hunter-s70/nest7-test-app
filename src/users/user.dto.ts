import { IsEmail, IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
  @IsOptional()
  @IsString()
  @MaxLength(16)
  @ApiPropertyOptional({default: 'username'})
  username?: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(40)
  @ApiProperty({default: 'example@gmail.com'})
  email: string;

  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty({default: 'qwerty'})
  password: string;
}
