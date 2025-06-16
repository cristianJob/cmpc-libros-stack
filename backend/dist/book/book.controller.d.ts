import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { GetBookQueryDto } from './dto/get-book.dto';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    create(createBookDto: CreateBookDto): Promise<import("./entities/book.entity").Book>;
    findAll(query: GetBookQueryDto): Promise<{
        books: import("./entities/book.entity").Book[];
        total: number;
    }>;
    findOne(id: string): Promise<import("./entities/book.entity").Book>;
    update(id: string, updateBookDto: UpdateBookDto): Promise<import("./entities/book.entity").Book>;
    remove(id: string): Promise<import("./entities/book.entity").Book>;
}
