import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UserResponseDto } from '../dto/user-response.dto';

export function FindAllUsersDocumentation() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'All users found',
      type: [UserResponseDto]
    })
  );
}
