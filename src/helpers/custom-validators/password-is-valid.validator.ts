import { registerDecorator, ValidationOptions } from 'class-validator';
import { PasswordIsValidConstraint } from '../constraints/password-is-valid.constraint';

export const PasswordIsValid = (validationOptions?: ValidationOptions) => {
  return (object: Object, property: string) => {
    registerDecorator({
      target: object.constructor,
      options: validationOptions,
      propertyName: property,
      constraints: [],
      validator: PasswordIsValidConstraint
    });
  };
};
