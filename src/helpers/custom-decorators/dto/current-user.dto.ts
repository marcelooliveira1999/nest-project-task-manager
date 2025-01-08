import { RoleEnum } from 'src/role/enum/role.enum';

export class CurrentUserDto {
  sub: string;
  email: string;
  role: RoleEnum;
  iat: number;
  exp: number;
}
