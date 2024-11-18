import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';

@Injectable()
export class EncryptService {
  private readonly encryptedSecret: string;

  constructor() {
    this.encryptedSecret = process.env.ENCRYPT_SECRET;
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
}
