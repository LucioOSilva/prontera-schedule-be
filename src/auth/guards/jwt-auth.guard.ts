import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {
    super(reflector, authService);
    //super();
  }

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      throw new UnauthorizedException('Token not provided');
    }

    const token = authorizationHeader.split(' ')[1]; // Remove "Bearer"

    const { decoded } = await this.authService.verifyToken(token);
    const userRole: string = decoded?.role;

    request.user = decoded;

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // Se não houver roles requeridas, a rota é acessível
    }

    if (!requiredRoles?.includes(userRole)) {
      throw new ForbiddenException('Invalid Access or Permissions Role');
    }
    // TODO: fazer o decrypto do name do user e inserir na request
    request.user = decoded;
    return true;
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      const errorMessage =
        err?.message || info?.message || 'Invalid or missing token';
      throw new UnauthorizedException(errorMessage);
    }
    return user;
  }
}
