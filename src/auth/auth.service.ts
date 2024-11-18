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

  private async validateAuthUser(
    email: string,
    password: string,
  ): Promise<boolean> {
    const query = { email };
    const returnFields = { password: 1 };
    const user = await this.userService.findOne(query, returnFields);
    if (!user) return false;
    const isValidPassword = this.encryptService.checkEncrypt(
      password,
      user.password,
    );
    return user && isValidPassword;
  }

  async login(authLogin: AuthDto): Promise<any> {
    const isUserAuthentic = await this.validateAuthUser(
      authLogin.email,
      authLogin.password,
    );
    if (!isUserAuthentic) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const userData = await this.userService.findByEmail(authLogin.email);
    const payload = { sub: userData._id, data: userData };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
