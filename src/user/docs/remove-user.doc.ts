import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { MessageResponseDto } from '../dto/message-response.dto';

export function RemoveUserDocumentation() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'User data deleted',
      type: MessageResponseDto
    })
  );
}
