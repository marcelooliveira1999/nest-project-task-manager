import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  PartialType
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { MessageResponseDto } from './dto/message-response.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatusEnum } from './enum/task-status.enum';
import { TaskService } from './task.service';

@Controller('task')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Task created',
    type: TaskResponseDto
  })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Tasks found',
    type: [TaskResponseDto]
  })
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: 200,
    description: 'Task found',
    type: TaskResponseDto
  })
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiBody({ type: PartialType(CreateTaskDto) })
  @ApiResponse({
    status: 200,
    description: 'Task updated',
    type: TaskResponseDto
  })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: 200,
    description: 'Task deleted',
    type: MessageResponseDto
  })
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }

  @Patch(':id/pending')
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: 200,
    description: 'Task status updated',
    type: MessageResponseDto
  })
  toPending(@Param('id') id: string) {
    return this.taskService.updateStatus(+id, TaskStatusEnum.PENDING);
  }

  @Patch(':id/in_progress')
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: 200,
    description: 'Task status updated',
    type: MessageResponseDto
  })
  toProgress(@Param('id') id: string) {
    return this.taskService.updateStatus(+id, TaskStatusEnum.IN_PROGRESS);
  }

  @Patch(':id/completed')
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: 200,
    description: 'Task status updated',
    type: MessageResponseDto
  })
  toCompleted(@Param('id') id: string) {
    return this.taskService.updateStatus(+id, TaskStatusEnum.COMPLETED);
  }

  @Patch(':id/cancelled')
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: 200,
    description: 'Task status updated',
    type: MessageResponseDto
  })
  toCancelled(@Param('id') id: string) {
    return this.taskService.updateStatus(+id, TaskStatusEnum.CANCELLED);
  }
}
