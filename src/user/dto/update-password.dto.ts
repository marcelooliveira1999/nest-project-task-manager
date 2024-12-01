import { IsNotEmpty, IsString } from 'class-validator';
import { PasswordIsValid } from 'src/helpers/custom-validators/password-is-valid.validator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @PasswordIsValid()
  password: string;
}
