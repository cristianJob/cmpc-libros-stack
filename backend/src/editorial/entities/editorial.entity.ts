import { Book } from '../../book/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Editorial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @OneToMany(() => Book, (book) => book.editorial, {
    cascade: true,
  })
  books: Book[];
}
