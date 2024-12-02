import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtConfigService } from './config/jwt.config.service';
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
    TaskModule,
    UserModule,
    AuthModule
  ],
  providers: [RootUserSeeder, PasswordHashPipe]
})
export class AppModule {}
