import {
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

// DTO para ThemeColors
export class ThemeColorsDto {
  @IsString()
  @IsNotEmpty()
  brandPrimary: string;

  @IsString()
  @IsNotEmpty()
  brandPrimaryLight: string;

  @IsString()
  @IsNotEmpty()
  brandPrimaryLighter: string;

  @IsString()
  @IsNotEmpty()
  brandSecondary: string;

  @IsString()
  @IsNotEmpty()
  brandSecondaryLight: string;

  @IsString()
  @IsNotEmpty()
  brandSecondaryLighter: string;
}

// DTO para Company
export class CompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  tenantId: string;

  @IsOptional() // Não obrigatório
  @IsBoolean()
  isActive: boolean = true; // Valor default no DTO

  @IsObject()
  @Type(() => ThemeColorsDto) // Transformação para garantir que o NestJS converta a propriedade themeColors corretamente
  themeColors: ThemeColorsDto;
}
