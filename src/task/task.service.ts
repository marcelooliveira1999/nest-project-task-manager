import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrentUserDto } from '../helpers/custom-decorators/dto/current-user.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { PaginationOptionsDto } from './dto/pagination-options.dto';
import { PaginationResponseDto } from './dto/pagination-response.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskStatusEnum } from './enum/task-status.enum';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    private readonly userService: UserService
  ) {}

  async create(
    createTaskDto: CreateTaskDto,
    currentUser: CurrentUserDto
  ): Promise<Task> {
    const user: User = await this.userService.findOne(currentUser.sub);
    const newTask: Task = this.taskRepository.create({
      ...createTaskDto,
      user
    });

    return await this.taskRepository.save(newTask);
  }

  async findAll(
    options: PaginationOptionsDto,
    user: CurrentUserDto
  ): Promise<PaginationResponseDto> {
    const { page, limit } = options;
    const skip: number = (page - 1) * limit;

    const [tasks, totalItems]: [Task[], number] =
      await this.taskRepository.findAndCount({
        where: { user: { id: user.sub } },
        skip,
        take: limit
      });

    if (tasks.length === 0) throw new NotFoundException();
    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: tasks,
      metadata: {
        page: page,
        next: page < totalPages ? page + 1 : null,
        limit: tasks.length,
        totalItems,
        totalPages
      }
    };
  }

  async findOne(id: number, user: CurrentUserDto): Promise<Task> {
    const task: Task = await this.taskRepository.findOneBy({
      id,
      user: { id: user.sub }
    });

    if (task) return task;
    throw new NotFoundException();
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    user: CurrentUserDto
  ): Promise<Task> {
    await this.findOne(id, user);
    await this.taskRepository.update({ id }, updateTaskDto);
    return await this.findOne(id, user);
  }

  async remove(id: number, user: CurrentUserDto) {
    const task: Task = await this.findOne(id, user);
    await this.taskRepository.softRemove(task);
    return { message: `Task ${id} deleted` };
  }

  async updateStatus(id: number, status: TaskStatusEnum, user: CurrentUserDto) {
    const task: Task = await this.findOne(id, user);
    if (task.status === status)
      return { message: `The task status is already up-to-date` };

    await this.taskRepository.update({ id }, { status });
    return { message: `The task status updated successfully` };
  }
}
