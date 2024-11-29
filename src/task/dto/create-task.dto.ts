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
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 500)
  description: string;

  @IsOptional()
  @IsEnum(Task)
  status: TaskStatusEnum;
}
