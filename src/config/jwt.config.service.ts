import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  private secret: string;
  private expiresIn: number;

  constructor(private readonly configService: ConfigService) {
    this.secret = this.configService.get<string>('JWT_SECRET');
    this.expiresIn = this.configService.get<number>('JWT_EXPIRATION_TIME');
  }

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.secret,
      signOptions: { expiresIn: +this.expiresIn }
    };
  }
}
