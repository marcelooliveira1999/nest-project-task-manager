import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, PartialType } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../helpers/custom-decorators/current-user.decorator';
import { CurrentUserDto } from '../helpers/custom-decorators/dto/current-user.dto';
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
  create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() user: CurrentUserDto
  ) {
    return this.taskService.create(createTaskDto, user);
  }

  @Get('book')
  @FindAllTasksDocumentation()
  findAll(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('limit', new ParseIntPipe()) limit: number,
    @CurrentUser() user: CurrentUserDto
  ) {
    return this.taskService.findAll({ page, limit }, user);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Task ID' })
  @FindOneTaskDocumentation()
  findOne(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser() user: CurrentUserDto
  ) {
    return this.taskService.findOne(id, user);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiBody({ type: PartialType(CreateTaskDto) })
  @UpdateTaskDocumentation()
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser() user: CurrentUserDto
  ) {
    return this.taskService.update(id, updateTaskDto, user);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Task ID' })
  @RemoveTaskDocumentation()
  remove(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser() user: CurrentUserDto
  ) {
    return this.taskService.remove(id, user);
  }

  @Patch(':id/pending')
  @ApiParam({ name: 'id', description: 'Task ID' })
  @TaskStatusUpdateDocumentation()
  toPending(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser() user: CurrentUserDto
  ) {
    return this.taskService.updateStatus(id, TaskStatusEnum.PENDING, user);
  }

  @Patch(':id/in_progress')
  @ApiParam({ name: 'id', description: 'Task ID' })
  @TaskStatusUpdateDocumentation()
  toProgress(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser() user: CurrentUserDto
  ) {
    return this.taskService.updateStatus(id, TaskStatusEnum.IN_PROGRESS, user);
  }

  @Patch(':id/completed')
  @ApiParam({ name: 'id', description: 'Task ID' })
  @TaskStatusUpdateDocumentation()
  toCompleted(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser() user: CurrentUserDto
  ) {
    return this.taskService.updateStatus(id, TaskStatusEnum.COMPLETED, user);
  }

  @Patch(':id/cancelled')
  @ApiParam({ name: 'id', description: 'Task ID' })
  @TaskStatusUpdateDocumentation()
  toCancelled(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser() user: CurrentUserDto
  ) {
    return this.taskService.updateStatus(id, TaskStatusEnum.CANCELLED, user);
  }
}
