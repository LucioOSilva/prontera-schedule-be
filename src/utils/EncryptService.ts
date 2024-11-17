import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { v5 as uuidv5 } from 'uuid';

@Injectable()
export class EncryptService {
  private readonly passwordSecret: string;

  constructor(private readonly configService: ConfigService) {
    this.passwordSecret = this.configService.get<string>('ENCRYPT_SECRET');
  }

  encrypt(password: string): string {
    return uuidv5(password, this.passwordSecret);
  }

  checkEncrypt(password: string, encryptedPassword: string): boolean {
    return uuidv5(password, this.passwordSecret) === encryptedPassword;
  }
}
