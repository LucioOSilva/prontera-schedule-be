import {
  IsIn,
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
} from 'class-validator';

export class UserDto {
  @IsString()
  @MinLength(6)
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsEmail()
  email?: string = null;

  @IsOptional()
  cpf?: string = null;

  @IsOptional()
  @IsIn([
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
  ])
  gender?: string = null;

  @IsOptional()
  @IsIn(['solteiro', 'casado', 'divorciado', 'viuvo', null])
  maritalStatus?: string = null;

  @IsOptional()
  @IsIn(['masculino', 'feminino', null])
  sex?: string = null;

  @IsOptional()
  phoneIsWhatsapp?: boolean;

  @IsOptional()
  birthDate?: string = null;

  @IsOptional()
  @MinLength(6)
  password?: string = null;

  @IsOptional()
  @IsIn(['admin', 'receptionist', 'doctor', 'patient'])
  role?: 'admin' | 'receptionist' | 'doctor' | 'patient';

  @IsOptional()
  @MinLength(3)
  tenantId?: string = null;

  @IsOptional()
  createdBy?: string = null;
}
