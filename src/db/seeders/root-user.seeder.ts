import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PasswordHashPipe } from 'src/helpers/custom-pipes/password-hash.pipe';
import { Role } from 'src/role/entities/role.entity';
import { RoleEnum } from 'src/role/enum/role.enum';
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RootUserSeeder {
  private rootName: string;
  private rootEmail: string;
  private rootPassword: string;

  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly passwordHashPipe: PasswordHashPipe,
    private readonly roleService: RoleService
  ) {
    this.rootName = this.configService.get<string>('ROOT_USER_NAME');
    this.rootEmail = this.configService.get<string>('ROOT_USER_EMAIL');
    this.rootPassword = this.configService.get<string>('ROOT_USER_PASSWORD');
  }

  async run() {
    const exists = await this.userService.findByEmail(this.rootEmail);
    if (exists) return;

    const hashedPassword: string = await this.passwordHashPipe.transform(
      this.rootPassword
    );

    const role: Role = await this.roleService.find(RoleEnum.ADMIN);
    const rootUser: CreateUserDto = {
      name: this.rootName,
      email: this.rootEmail,
      password: hashedPassword,
      role
    } as CreateUserDto;

    await this.userService.create(rootUser);
  }
}
