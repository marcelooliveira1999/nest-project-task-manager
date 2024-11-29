import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('POSTGRES_HOST'),
      port: this.configService.get<number>('POSTGRES_PORT'),
      database: this.configService.get<string>('POSTGRES_DB'),
      username: this.configService.get<string>('POSTGRES_USER'),
      password: this.configService.get<string>('POSTGRES_PASSWORD'),
      schema: this.configService.get<string>('POSTGRES_SCHEMA'),
      autoLoadEntities: true,
      synchronize: false,
      retryAttempts: this.configService.get<number>('PG_RETRY_ATTEMPTS'),
      retryDelay: this.configService.get<number>('PG_RETRY_DELAY_SEC') * 1000
    };
  }
}
