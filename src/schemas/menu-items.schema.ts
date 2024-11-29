import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MenuItemDocument = HydratedDocument<MenuItem>;

@Schema({ timestamps: true })
export class MenuItem {
  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  icon: string;

  @Prop({ default: '/' })
  to: string;

  @Prop({ required: true, enum: ['menu', 'config'], default: 'menu' })
  type: string;
}

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);
