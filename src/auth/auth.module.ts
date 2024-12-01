import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UtilsService } from '../utils';

@Module({
  imports: [
    ConfigModule.forRoot(), // Habilita o uso de variáveis de ambiente
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { algorithm: 'HS256' }, // Sem expiração, quando adicionar refresh token, adicionar "expiresIn: '12h' em "signOptions",
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UtilsService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
