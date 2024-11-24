import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({ _id: false })
export class ThemeColors {
  @Prop({ required: true })
  brandPrimary: string;

  @Prop({ required: true })
  brandPrimaryLight: string;

  @Prop({ required: true })
  brandPrimaryLighter: string;

  @Prop({ required: true })
  brandSecondary: string;

  @Prop({ required: true })
  brandSecondaryLight: string;

  @Prop({ required: true })
  brandSecondaryLighter: string;
}

export const ThemeColorsSchema = SchemaFactory.createForClass(ThemeColors);

@Schema()
export class Company {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  tenantId: string;

  @Prop({ default: true, required: false })
  isActive: boolean;

  @Prop({ type: ThemeColorsSchema, required: true })
  themeColors: ThemeColors;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
