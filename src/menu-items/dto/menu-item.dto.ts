import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMenuItemDto {
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
