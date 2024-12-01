import {
  IsIn,
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsString()
  @MinLength(6)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

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
