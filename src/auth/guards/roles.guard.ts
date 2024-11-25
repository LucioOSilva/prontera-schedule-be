import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Recupera as roles requeridas do decorador @Roles
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      throw new UnauthorizedException('Token not provided');
    }

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // Se não houver roles requeridas, a rota é acessível
    }

    const token = authorizationHeader.split(' ')[1]; // Remove "Bearer"

    const { decoded } = await this.authService.verifyToken(token);
    const userRole: string = decoded?.role;

    if (!requiredRoles?.includes(userRole)) {
      throw new ForbiddenException('Invalid Access or Permissions Role');
    }
    // TODO: fazer o decrypto do name do user e inserir na request
    request.user = decoded;
    return true;
  }
}
