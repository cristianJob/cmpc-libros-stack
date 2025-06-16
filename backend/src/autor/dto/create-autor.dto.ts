import { IsNotEmpty } from 'class-validator';

export class CreateAutorDto {
  @IsNotEmpty({ message: 'El autor es obligatorio' })
  name: string;
}
