import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { CompositeGuard } from './common/composite-guard';
import { JwtConfigService } from './config/jwt.config.service';
import { ThrottlerConfigService } from './config/throttler.config.service';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { RootUserSeeder } from './db/seeders/root-user.seeder';
import { PasswordHashPipe } from './helpers/custom-pipes/password-hash.pipe';
import { RoleGuard } from './role/role.guard';
import { RoleModule } from './role/role.module';
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
    AuthModule,
    RoleModule
  ],
  providers: [
    RootUserSeeder,
    PasswordHashPipe,
    ThrottlerGuard,
    AuthGuard,
    RoleGuard,
    {
      provide: APP_GUARD,
      useClass: CompositeGuard
    }
  ]
})
export class AppModule {}
