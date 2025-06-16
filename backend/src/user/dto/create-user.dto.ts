import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El usuario es Obligatorio' })
  username: string;

  @IsNotEmpty({ message: 'La contraseña es Obligatoria' })
  password: string;
}
