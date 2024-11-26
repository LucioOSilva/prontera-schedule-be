import { IsString, IsNotEmpty } from 'class-validator';

export class MenuItemDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  icon: string;

  @IsString()
  @IsNotEmpty()
  to: string;
}
