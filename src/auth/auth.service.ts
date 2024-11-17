// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { EncryptService } from '../utils';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private encryptService: EncryptService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    const userHashedPassword = user.password;
    const hashedPassword = this.encryptService.encrypt(password);

    if (user && userHashedPassword === hashedPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(authLogin: AuthDto): Promise<any> {
    const user = await this.validateUser(authLogin.email, authLogin.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
