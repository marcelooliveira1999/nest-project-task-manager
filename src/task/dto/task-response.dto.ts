import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../entities/task.entity';
import { TaskStatusEnum } from '../enum/task-status.enum';

export class TaskResponseDto extends Task {
  @ApiProperty({ type: 'integer', description: 'Task ID' })
  id: number;

  @ApiProperty({ type: 'string', description: 'Task title' })
  title: string;

  @ApiProperty({ type: 'string', description: 'Task description' })
  description: string;

  @ApiProperty({ enum: TaskStatusEnum, description: 'Task status' })
  status: TaskStatusEnum;

  @ApiProperty({ type: Date, description: 'Task creation date' })
  createdAt: Date;

  @ApiProperty({ type: Date, description: 'Task updating date' })
  updatedAt: Date;
}
