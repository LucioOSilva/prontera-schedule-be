import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MenuItem extends Document {
  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  icon: string;

  @Prop({ default: true })
  to: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);
