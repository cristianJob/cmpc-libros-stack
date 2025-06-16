import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Like, Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { Editorial } from '../editorial/entities/editorial.entity';
import { Genero } from '../genero/entities/genero.entity';
import { Autor } from '../autor/entities/autor.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Editorial)
    private readonly editorialRepository: Repository<Editorial>,
    @InjectRepository(Genero)
    private readonly generoRepository: Repository<Genero>,
    @InjectRepository(Autor)
    private readonly autorRepository: Repository<Autor>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const autor = await this.autorRepository.findOneBy({
      id: createBookDto.autor,
    });
    if (!autor) throw new NotFoundException('Autor no existe');

    const editorial = await this.editorialRepository.findOneBy({
      id: createBookDto.editorial,
    });
    if (!editorial) throw new NotFoundException('Editorial no existe');

    const genero = await this.generoRepository.findOneBy({
      id: createBookDto.genero,
    });
    if (!genero) throw new NotFoundException('Genero no existe');

    const book = this.bookRepository.create({
      ...createBookDto,
      autor,
      editorial,
      genero,
    });
    return this.bookRepository.save(book);
  }

  // eslint-disable-next-line prettier/prettier
  async findAll( take: number, skip: number, autor?: number, editorial?: number, genero?: number, titulo?: string) {
    const where: FindOptionsWhere<Book> = {};
    if (autor) where.autorId = autor;
    if (editorial) where.editorialId = editorial;
    if (genero) where.generoId = genero;
    if (titulo) where.titulo = Like(`%${titulo}%`);

    const options: FindManyOptions<Book> = {
      where: Object.keys(where).length > 0 ? where : undefined,
      order: {
        id: 'ASC',
      },
      take,
      skip,
    };

    const [books, total] = await this.bookRepository.findAndCount(options);
    return {
      books,
      total,
    };
  }

  async findOne(id: number) {
    const book = await this.bookRepository.findOneBy({ id: id });
    if (!book) throw new NotFoundException('Libro no existe');
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.findOne(id);
    Object.assign(book, updateBookDto);

    // eslint-disable-next-line prettier/prettier
    const autor = await this.autorRepository.findOneBy({ id: updateBookDto.autorId });
    if (!autor) throw new NotFoundException('Autor no existe');

    // eslint-disable-next-line prettier/prettier
    const editorial = await this.editorialRepository.findOneBy({ id: updateBookDto.editorialId });
    if (!editorial) throw new NotFoundException('Editorial no existe');

    // eslint-disable-next-line prettier/prettier
    const genero = await this.generoRepository.findOneBy({ id: updateBookDto.generoId });
    if (!genero) throw new NotFoundException('Genero no existe');

    book.autor = autor;
    book.editorial = editorial;
    book.genero = genero;
    return this.bookRepository.save(book);
  }

  async remove(id: number) {
    const book = await this.findOne(id);
    return this.bookRepository.remove(book);
  }
}
