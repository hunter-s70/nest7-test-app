import { IsEmail, IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsString()
  @MaxLength(16)
  username?: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(40)
  email: string;

  @IsNotEmpty()
  @MaxLength(30)
  password: string;
}
