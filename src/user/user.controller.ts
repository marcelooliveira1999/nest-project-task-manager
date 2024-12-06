import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PasswordHashPipe } from 'src/helpers/custom-pipes/password-hash.pipe';
import { CreateUserDocumentation } from './docs/create-user.doc';
import { FindAllUsersDocumentation } from './docs/find-all-users.doc';
import { FindOneUserDocumentation } from './docs/find-one-user.doc';
import { RemoveUserDocumentation } from './docs/remove-user.doc';
import { UpdateUserPasswordDocumentation } from './docs/update-user-password.doc';
import { UpdateUserDocumentation } from './docs/update-user.doc';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard)
  @CreateUserDocumentation()
  create(
    @Body() createUserDto: CreateUserDto,
    @Body('password', PasswordHashPipe) password: string
  ) {
    createUserDto.password = password;
    return this.userService.create(createUserDto);
  }

  @Get()
  @FindAllUsersDocumentation()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @FindOneUserDocumentation()
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UpdateUserDocumentation()
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @RemoveUserDocumentation()
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.remove(id);
  }

  @Patch(':id/update-password')
  @UpdateUserPasswordDocumentation()
  updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Body('password', PasswordHashPipe) password: string
  ) {
    return this.userService.updatePassword(id, password);
  }
}
