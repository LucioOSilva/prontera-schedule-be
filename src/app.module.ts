import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { validationSchema } from './config/schema';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna as configurações disponíveis em toda a aplicação
      validationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DBCONNECTION'), // Lê a URI do banco do .env
        dbName: `PRONTERA_SCHEDULE_${configService.get<string>('ENV')}`,
      }),
    }),
    AuthModule,
    UserModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
