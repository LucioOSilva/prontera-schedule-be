import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from '../schemas/company.schema';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { AuthModule } from '../auth/auth.module'; // Importando o AuthModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    AuthModule, // Agora importa o AuthModule (não o UserModule diretamente)
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
