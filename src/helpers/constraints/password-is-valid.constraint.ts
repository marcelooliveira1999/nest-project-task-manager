import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

@Injectable()
@ValidatorConstraint()
export class PasswordIsValidConstraint implements ValidatorConstraintInterface {
  validate(
    password: string,
    validationArguments?: ValidationArguments
  ): boolean {
    if (!this.checkCharacteres(password)) return false;
    if (this.checkEqualsCharacteres(password)) return false;
    return true;
  }

  private checkCharacteres(password: string): boolean {
    const role =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return role.test(password);
  }

  private checkEqualsCharacteres(password: string): boolean {
    const role = /(.)\1{2,}/;
    return role.test(password);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Invalid password';
  }
}
