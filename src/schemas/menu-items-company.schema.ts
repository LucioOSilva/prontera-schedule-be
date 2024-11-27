import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MenuItemsCompanyDocument = HydratedDocument<MenuItemsCompany>;

@Schema({ timestamps: true })
export class MenuItemsCompany {
  @Prop({ required: true })
  tenantId: string;

  @Prop({ required: true })
  role: string;

  @Prop({ type: [String], default: [] })
  menu: string[]; // Array de strings, tratado como IDs no nível do endpoint

  @Prop({ type: [String], default: [] })
  menuConfigs: string[]; // Array de strings, tratado como IDs no nível do endpoint
}

export const MenuItemsCompanySchema =
  SchemaFactory.createForClass(MenuItemsCompany);
