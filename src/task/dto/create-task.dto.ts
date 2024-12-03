import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length
} from 'class-validator';
import { Task } from '../entities/task.entity';
import { TaskStatusEnum } from '../enum/task-status.enum';

export class CreateTaskDto extends Task {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  @ApiProperty({
    description: 'Task title',
    maxLength: 100,
    minLength: 3,
    required: true
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 500)
  @ApiProperty({
    description: 'Task description',
    maxLength: 500,
    minLength: 3,
    required: true
  })
  description: string;

  @IsOptional()
  @IsEnum(Task)
  @ApiProperty({
    description: 'Task status',
    required: false,
    enum: TaskStatusEnum,
    default: TaskStatusEnum.PENDING
  })
  status: TaskStatusEnum;
}
