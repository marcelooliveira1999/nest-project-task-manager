import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/role/role.guard';

@Injectable()
export class CompositeGuard implements CanActivate {
  constructor(
    private readonly throttlerGuard: ThrottlerGuard,
    private readonly authGuard: AuthGuard,
    private readonly roleGuard: RoleGuard
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const throttlerPass = await this.throttlerGuard.canActivate(context);
    if (!throttlerPass) return false;

    const authPass = await this.authGuard.canActivate(context);
    if (!authPass) return false;

    return this.roleGuard.canActivate(context);
  }
}
