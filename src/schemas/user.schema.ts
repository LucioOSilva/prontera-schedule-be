import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, minlength: 6 })
  name: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false, default: null })
  cpf: string;

  @Prop({
    required: false,
    enum: [
      'mulher-cisgenero',
      'mulher-transgenero',
      'mulher-transexual',
      'homem-cisgenero',
      'homem-transgenero',
      'homem-transexual',
      'genero-nao-binario',
      'agenero',
      'genero-fluido',
      'bigenero',
      null,
    ],
    default: null,
  })
  gender: string;

  @Prop({
    required: false,
    enum: ['solteiro', 'casado', 'divorciado', 'viuvo', null],
    default: null,
  })
  maritalStatus: string;

  @Prop({
    required: false,
    enum: ['masculino', 'feminino', null],
    default: null,
  })
  sex: string;

  @Prop({ required: false, default: false })
  phoneIsWhatsapp: boolean;

  @Prop({ required: false, default: null })
  birthDate: string;

  @Prop({ select: false, required: true, minlength: 6 })
  password: string;

  @Prop({
    required: true,
    enum: ['admin', 'receptionist', 'doctor', 'patient'],
    default: 'patient',
  })
  role: string;

  @Prop({ required: true, minlength: 3 })
  tenantId: string;

  @Prop({ required: true, select: false })
  createdBy: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
