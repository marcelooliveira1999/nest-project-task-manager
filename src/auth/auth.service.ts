import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  private expiresIn: number;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    this.expiresIn = this.configService.get<number>('JWT_EXPIRATION_TIME');
  }

  async signIn(email: string, password: string): Promise<AuthResponseDto> {
    const user: User | null = await this.userService.findByEmail(email);

    if (!user || !compareSync(password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      email,
      role: user.role.tag
    };

    const token = this.jwtService.sign(payload);
    return { token, expiresIn: +this.expiresIn };
  }
}
