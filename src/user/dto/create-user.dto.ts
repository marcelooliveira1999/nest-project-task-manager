import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PasswordIsValid } from 'src/helpers/custom-validators/password-is-valid.validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @PasswordIsValid()
  password: string;
}
