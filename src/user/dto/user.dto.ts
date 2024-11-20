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
  @IsIn(['admin', 'client', 'guest'])
  role: 'admin' | 'client' | 'guest';

  @IsString()
  @MinLength(3)
  tenantId: string;
}
