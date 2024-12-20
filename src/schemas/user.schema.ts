import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false, default: null })
  cpf: string;

  @Prop({
    required: false,
    enum: ['male', 'female', null],
    default: 'null',
  })
  gender: string;

  @Prop({
    required: false,
    enum: ['single', 'married', 'divorced', null],
    default: 'null',
  })
  maritalStatus: string;

  @Prop({ required: true })
  tenantId: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({
    required: true,
    enum: ['admin', 'receptionist', 'doctor', 'patient'],
    default: 'patient',
  })
  role: string;

  @Prop({ select: false })
  __v: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
