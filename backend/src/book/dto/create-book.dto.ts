import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty({ message: 'El titulo es obligatorio' })
  titulo: string;

  @IsNotEmpty({ message: 'El precio es obligatorio' })
  @IsNumber({}, { message: 'Precio no válido' })
  precio: number;

  @IsNotEmpty({ message: 'La disponibilidad es obligatoria' })
  @IsNumber({}, { message: 'Disponibilidad no válido' })
  disponibilidad: number;

  @IsNotEmpty({ message: 'El autor es obligatorio' })
  @IsNumber({}, { message: 'Autor no válido' })
  autor: number;

  @IsNotEmpty({ message: 'La editorial es obligatoria' })
  @IsNumber({}, { message: 'Editorial no válida' })
  editorial: number;

  @IsNotEmpty({ message: 'El genero es obligatorio' })
  @IsNumber({}, { message: 'Genero no válido' })
  genero: number;
}
