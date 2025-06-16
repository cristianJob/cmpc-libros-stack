import { IsNumberString, IsOptional } from 'class-validator';

export class GetBookQueryDto {
  @IsOptional()
  @IsNumberString({}, { message: 'Take debe ser un numero' })
  take: number;

  @IsOptional()
  @IsNumberString({}, { message: 'Skip debe ser un numero' })
  skip: number;

  @IsOptional()
  @IsNumberString({}, { message: 'Autor debe ser un numero' })
  autor: number;

  @IsOptional()
  @IsNumberString({}, { message: 'Genero debe ser un numero' })
  genero: number;

  @IsOptional()
  @IsNumberString({}, { message: 'Editorial debe ser un numero' })
  editorial: number;

  @IsOptional()
  titulo: string;
}
