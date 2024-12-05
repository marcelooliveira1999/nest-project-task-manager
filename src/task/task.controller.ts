import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, PartialType } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateTaskDocumentation } from './docs/create-task.doc';
import { FindAllTasksDocumentation } from './docs/find-all-tasks.doc';
import { FindOneTaskDocumentation } from './docs/find-one-task.doc';
import { RemoveTaskDocumentation } from './docs/remove-task.doc';
import { TaskStatusUpdateDocumentation } from './docs/task-status-update.doc';
import { UpdateTaskDocumentation } from './docs/update-task.doc';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatusEnum } from './enum/task-status.enum';
import { TaskService } from './task.service';

@Controller('task')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @CreateTaskDocumentation()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @FindAllTasksDocumentation()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Task ID' })
  @FindOneTaskDocumentation()
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiBody({ type: PartialType(CreateTaskDto) })
  @UpdateTaskDocumentation()
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Task ID' })
  @RemoveTaskDocumentation()
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.taskService.remove(id);
  }

  @Patch(':id/pending')
  @ApiParam({ name: 'id', description: 'Task ID' })
  @TaskStatusUpdateDocumentation()
  toPending(@Param('id', new ParseIntPipe()) id: number) {
    return this.taskService.updateStatus(id, TaskStatusEnum.PENDING);
  }

  @Patch(':id/in_progress')
  @ApiParam({ name: 'id', description: 'Task ID' })
  @TaskStatusUpdateDocumentation()
  toProgress(@Param('id', new ParseIntPipe()) id: number) {
    return this.taskService.updateStatus(id, TaskStatusEnum.IN_PROGRESS);
  }

  @Patch(':id/completed')
  @ApiParam({ name: 'id', description: 'Task ID' })
  @TaskStatusUpdateDocumentation()
  toCompleted(@Param('id', new ParseIntPipe()) id: number) {
    return this.taskService.updateStatus(id, TaskStatusEnum.COMPLETED);
  }

  @Patch(':id/cancelled')
  @ApiParam({ name: 'id', description: 'Task ID' })
  @TaskStatusUpdateDocumentation()
  toCancelled(@Param('id', new ParseIntPipe()) id: number) {
    return this.taskService.updateStatus(id, TaskStatusEnum.CANCELLED);
  }
}
