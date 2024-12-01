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
  @IsIn(['male', 'female', null])
  gender?: string = null;

  @IsOptional()
  @IsIn(['single', 'married', 'divorced', null])
  maritalStatus?: string = null;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['admin', 'recepcionist', 'doctor', 'patient'])
  role?: 'admin' | 'recepcionist' | 'doctor' | 'patient';

  @IsString()
  @MinLength(3)
  tenantId: string;
}
