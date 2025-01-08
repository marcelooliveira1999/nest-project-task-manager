import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { RoleEnum } from './enum/role.enum';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>
  ) {}

  async find(role: RoleEnum): Promise<Role> {
    return await this.roleRepository.findOne({
      where: { tag: role }
    });
  }
}
