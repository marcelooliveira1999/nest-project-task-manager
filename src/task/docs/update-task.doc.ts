import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { TaskResponseDto } from '../dto/task-response.dto';

export function UpdateTaskDocumentation() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Task data updated',
      type: TaskResponseDto
    })
  );
}
