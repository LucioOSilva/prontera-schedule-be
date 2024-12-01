import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UtilsService {
  private readonly encryptedSecret: string;

  constructor(configService: ConfigService) {
    this.encryptedSecret = configService.get<string>('ENCRYPT_SECRET');
  }

  encrypt(text: string): string {
    const hash = createHash('sha256');
    hash.update(text + this.encryptedSecret);
    return hash.digest('hex');
  }

  checkEncrypt(text: string, encryptedText: string): boolean {
    const hashedPassword = this.encrypt(text);
    return hashedPassword === encryptedText;
  }

  generateRandomEmail(tenantId: string): string {
    const min = 0;
    const max = 99999;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    return `${tenantId}.${random}@randomized.com`;
  }
}
