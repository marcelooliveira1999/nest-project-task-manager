import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { TaskResponseDto } from '../dto/task-response.dto';

export function FindAllTasksDocumentation() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'All tasks found',
      type: [TaskResponseDto]
    })
  );
}
