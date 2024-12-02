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
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatusEnum } from './enum/task-status.enum';
import { TaskService } from './task.service';

@Controller('task')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }

  @Patch(':id/pending')
  toPending(@Param('id') id: string) {
    return this.taskService.updateStatus(+id, TaskStatusEnum.PENDING);
  }

  @Patch(':id/in_progress')
  toProgress(@Param('id') id: string) {
    return this.taskService.updateStatus(+id, TaskStatusEnum.IN_PROGRESS);
  }

  @Patch(':id/completed')
  toCompleted(@Param('id') id: string) {
    return this.taskService.updateStatus(+id, TaskStatusEnum.COMPLETED);
  }

  @Patch(':id/cancelled')
  toCancelled(@Param('id') id: string) {
    return this.taskService.updateStatus(+id, TaskStatusEnum.CANCELLED);
  }
}
