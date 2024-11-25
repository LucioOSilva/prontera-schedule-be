import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { EncryptService } from '../utils';
import { AuthDto } from './dto/auth.dto';
import { LoggedUser, Token } from './types';

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
    tenantId: string,
  ): Promise<boolean> {
    const query = { email };
    const returnFields = { tenantId: 1, password: 1 };
    const user = await this.userService.findOne(query, returnFields);
    if (!user) return false;
    const isValidPassword = this.encryptService.checkEncrypt(
      password,
      user.password,
    );
    const isValidTenant = user.tenantId === tenantId;
    return user && isValidPassword && isValidTenant;
  }

  async verifyToken(token: string | undefined | null): Promise<any> {
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return { valid: true, decoded };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async hasRolePermission(token: string, role: string): Promise<boolean> {
    const decoded = await this.jwtService.verifyAsync(token.split(' ')[1]);
    if (!decoded?.role) {
      throw new UnauthorizedException('Invalid roles in token');
    }

    const hasPermission = decoded.role.includes(role);
    if (!hasPermission) {
      throw new UnauthorizedException('Unauthorized or invalid permission');
    }

    return true;
  }

  async login(authLogin: AuthDto): Promise<Token> {
    const isUserAuthentic = await this.validateAuthUser(
      authLogin.email,
      authLogin.password,
      authLogin.tenantId,
    );
    if (!isUserAuthentic) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const userData = await this.userService.findByEmail(authLogin.email);
    return {
      token: await this.jwtService.signAsync(userData.toJSON()),
    };
  }
}
