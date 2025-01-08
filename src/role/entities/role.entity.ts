import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { RoleEnum } from '../enum/role.enum';

@Entity({ name: 'role' })
export class Role {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'enum', enum: RoleEnum })
  tag: RoleEnum;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
