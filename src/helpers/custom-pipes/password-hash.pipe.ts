import { Injectable, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordHashPipe implements PipeTransform {
  constructor(private readonly configService: ConfigService) {}

  async transform(password: string): Promise<string> {
    const salt: string = this.configService.get<string>('HASH_SALT');
    return await bcrypt.hash(password, salt);
  }
}
