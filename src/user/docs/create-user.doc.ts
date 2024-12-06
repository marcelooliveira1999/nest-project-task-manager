import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UserResponseDto } from '../dto/user-response.dto';

export function CreateUserDocumentation() {
  return applyDecorators(
    ApiResponse({
      status: 201,
      description: 'User successfully created',
      type: UserResponseDto
    })
  );
}
