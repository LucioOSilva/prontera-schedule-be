import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  tenantId: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({
    required: true,
    enum: ['admin', 'client', 'guest'],
    default: 'guest',
  })
  role: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ select: false })
  __v: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
