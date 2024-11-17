import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EncryptService } from '../utils';

@Module({
  imports: [
    ConfigModule.forRoot(), // Habilita o uso de variáveis de ambiente
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '0' }, // Sem expiração, ex 1 hora => '1h'
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, EncryptService, JwtStrategy],
})
export class AuthModule {}
