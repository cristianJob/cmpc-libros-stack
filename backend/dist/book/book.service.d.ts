import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { Editorial } from 'src/editorial/entities/editorial.entity';
import { Genero } from 'src/genero/entities/genero.entity';
import { Autor } from 'src/autor/entities/autor.entity';
export declare class BookService {
    private readonly bookRepository;
    private readonly editorialRepository;
    private readonly generoRepository;
    private readonly autorRepository;
    constructor(bookRepository: Repository<Book>, editorialRepository: Repository<Editorial>, generoRepository: Repository<Genero>, autorRepository: Repository<Autor>);
    create(createBookDto: CreateBookDto): Promise<Book>;
    findAll(take: number, skip: number, autor?: number, editorial?: number, genero?: number): Promise<{
        books: Book[];
        total: number;
    }>;
    findOne(id: number): Promise<Book>;
    update(id: number, updateBookDto: UpdateBookDto): Promise<Book>;
    remove(id: number): Promise<Book>;
}
