import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    format: 'email',
    required: true
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    format: 'password',
    required: true
  })
  password: string;
}
