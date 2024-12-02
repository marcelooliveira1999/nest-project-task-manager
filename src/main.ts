import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RootUserSeeder } from './db/seeders/root-user.seeder';

(async function () {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true
    })
  );

  const rootUserSeeder = app.get<RootUserSeeder>(RootUserSeeder);
  await rootUserSeeder.run();

  const configService = app.get<ConfigService>(ConfigService);
  const port: number = configService.get<number>('PORT');
  await app.listen(port ?? 8080);
})();
