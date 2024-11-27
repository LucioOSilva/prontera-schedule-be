import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuItemsCompanyService } from './menu-items-company.service';
import { MenuItemsCompanyController } from './menu-items-company.controller';
import {
  MenuItemsCompany,
  MenuItemsCompanySchema,
} from '../schemas/menu-items-company.schema';
import { MenuItem, MenuItemSchema } from '../schemas/menu-items.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MenuItemsCompany.name, schema: MenuItemsCompanySchema },
      { name: MenuItem.name, schema: MenuItemSchema },
    ]),
    AuthModule,
  ],
  providers: [MenuItemsCompanyService],
  controllers: [MenuItemsCompanyController],
})
export class MenuItemsCompanyModule {}
