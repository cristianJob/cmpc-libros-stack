import { IsNotEmpty } from 'class-validator';

export class CreateEditorialDto {
  @IsNotEmpty({ message: 'La editorial es obligatoria' })
  name: string;
}
