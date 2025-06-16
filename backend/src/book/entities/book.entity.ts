import { Autor } from '../../autor/entities/autor.entity';
import { Editorial } from '../../editorial/entities/editorial.entity';
import { Genero } from '../../genero/entities/genero.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  titulo: string;

  @Column('int')
  precio: number;

  @Column('int')
  disponibilidad: number;

  @Column('int')
  generoId: number;

  @Column('int')
  autorId: number;

  @Column('int')
  editorialId: number;

  @ManyToOne(() => Autor, { eager: true })
  autor: Autor;

  @ManyToOne(() => Editorial, { eager: true })
  editorial: Editorial;

  @ManyToOne(() => Genero, { eager: true })
  genero: Genero;
}
