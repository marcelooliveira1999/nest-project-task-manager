import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../entities/task.entity';
import { TaskResponseDto } from './task-response.dto';

export class PaginationMetadata {
  @ApiProperty()
  page: number;

  @ApiProperty()
  next: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  totalItems: number;
}

export class PaginationResponseDto {
  @ApiProperty({ type: [TaskResponseDto] })
  data: Task[];

  @ApiProperty()
  metadata: PaginationMetadata;
}
