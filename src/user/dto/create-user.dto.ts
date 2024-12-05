import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PasswordIsValid } from 'src/helpers/custom-validators/password-is-valid.validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    format: 'email',
    required: true
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @PasswordIsValid()
  @ApiProperty({
    required: true
  })
  password: string;
}
