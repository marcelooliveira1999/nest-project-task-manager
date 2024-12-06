import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { PaginationOptionsDto } from './dto/pagination-options.dto';
import { PaginationResponseDto } from './dto/pagination-response.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskStatusEnum } from './enum/task-status.enum';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask: Task = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(newTask);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginationResponseDto> {
    const { page, limit } = options;
    const skip: number = (page - 1) * limit;

    const [tasks, totalItems]: [Task[], number] =
      await this.taskRepository.findAndCount({
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

  async findOne(id: number): Promise<Task> {
    const task: Task = await this.taskRepository.findOneBy({ id });
    if (task) return task;

    throw new NotFoundException();
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.findOne(id);
    await this.taskRepository.update({ id }, updateTaskDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    const task: Task = await this.findOne(id);
    await this.taskRepository.softRemove(task);
    return { message: `Task ${id} deleted` };
  }

  async updateStatus(id: number, status: TaskStatusEnum) {
    const task: Task = await this.findOne(id);
    if (task.status === status)
      return { message: `The task status is already up-to-date` };

    await this.taskRepository.update({ id }, { status });
    return { message: `The task status updated successfully` };
  }
}
