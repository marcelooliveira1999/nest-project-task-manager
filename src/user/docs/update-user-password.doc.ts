import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { MessageResponseDto } from '../dto/message-response.dto';

export function UpdateUserPasswordDocumentation() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'User password updated',
      type: MessageResponseDto
    })
  );
}
