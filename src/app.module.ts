import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtConfigService } from './config/jwt.config.service';
import { ThrottlerConfigService } from './config/throttler.config.service';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { RootUserSeeder } from './db/seeders/root-user.seeder';
import { PasswordHashPipe } from './helpers/custom-pipes/password-hash.pipe';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),
    JwtModule.registerAsync({
      useClass: JwtConfigService,
      global: true
    }),
    ThrottlerModule.forRootAsync({
      useClass: ThrottlerConfigService
    }),
    TaskModule,
    UserModule,
    AuthModule
  ],
  providers: [
    RootUserSeeder,
    PasswordHashPipe,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}
