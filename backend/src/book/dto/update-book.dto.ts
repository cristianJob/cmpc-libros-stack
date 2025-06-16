import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsNotEmpty({ message: 'El genero es obligatorio' })
  @IsNumber({}, { message: 'Genero no válido' })
  generoId: number;

  @IsNotEmpty({ message: 'El autor es obligatorio' })
  @IsNumber({}, { message: 'Genero no válido' })
  autorId: number;

  @IsNotEmpty({ message: 'La editorial es obligatorio' })
  @IsNumber({}, { message: 'Genero no válido' })
  editorialId: number;
}
