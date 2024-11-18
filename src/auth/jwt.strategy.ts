// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config'; // Importando o ConfigService

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'W1NGSP@N1988', // configService.get<string>('JWT_SECRET'), // Usando ConfigService para obter a chave secreta
    });
  }

  // async validate(payload: any) {
  //   console.log('configService', this.configService);
  //   return { userId: payload.sub, email: payload.data.email }; // Retorna os dados do usuário
  // }
}
