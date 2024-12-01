import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UtilsService } from '../utils';
import { AuthDto } from './dto/auth.dto';
import { LoggedUser, Token, TokenValid } from './types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private utilsService: UtilsService,
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
    const isValidPassword = this.utilsService.checkEncrypt(
      password,
      user.password,
    );
    const isValidTenant = user.tenantId === tenantId;
    return user && isValidPassword && isValidTenant;
  }

  async verifyToken(token: string | undefined | null): Promise<TokenValid> {
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return { isValid: true, decoded };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
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

    const userData = await this.userService.findByTenantAndEmail(
      authLogin.tenantId,
      authLogin.email,
    );
    return {
      token: await this.jwtService.signAsync(userData.toJSON()),
    };
  }
}
