import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { TaskResponseDto } from '../dto/task-response.dto';

export function CreateTaskDocumentation() {
  return applyDecorators(
    ApiResponse({
      status: 201,
      description: 'Task successfully created',
      type: TaskResponseDto
    })
  );
}
