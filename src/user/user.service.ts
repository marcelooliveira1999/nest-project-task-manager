import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userReporitory: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser: User = this.userReporitory.create(createUserDto);
    return await this.userReporitory.save(newUser);
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.userReporitory.find();
    if (users.length > 0) return users;

    throw new NotFoundException();
  }

  async findOne(id: string): Promise<User> {
    const user: User = await this.userReporitory.findOneBy({ id });
    if (user) return user;

    throw new NotFoundException();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password)
      throw new BadRequestException(
        'To update your password, you must first request update'
      );

    await this.findOne(id);
    await this.userReporitory.update({ id }, updateUserDto);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<{ message: string }> {
    const user: User = await this.findOne(id);
    await this.userReporitory.softRemove(user);
    return { message: `User ${user.name} deleted` };
  }

  async updatePassword(
    id: string,
    password: string
  ): Promise<{ message: string }> {
    await this.findOne(id);
    await this.userReporitory.update({ id }, { password });
    return { message: 'Password updated successfully' };
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userReporitory.findOneBy({ email });
  }
}
