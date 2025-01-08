import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CurrentUserDto } from '../helpers/custom-decorators/dto/current-user.dto';
import { Roles } from './decorator/role.reflector';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflactor: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflactor.get(Roles, context.getHandler());
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user: CurrentUserDto = request['user'];

    return this.matchRoles(roles, user.role);
  }

  matchRoles(roles: string[], userRole: string): boolean {
    return roles.includes(userRole);
  }
}
