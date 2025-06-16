"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const book_entity_1 = require("./entities/book.entity");
const editorial_entity_1 = require("../editorial/entities/editorial.entity");
const genero_entity_1 = require("../genero/entities/genero.entity");
const autor_entity_1 = require("../autor/entities/autor.entity");
let BookService = class BookService {
    bookRepository;
    editorialRepository;
    generoRepository;
    autorRepository;
    constructor(bookRepository, editorialRepository, generoRepository, autorRepository) {
        this.bookRepository = bookRepository;
        this.editorialRepository = editorialRepository;
        this.generoRepository = generoRepository;
        this.autorRepository = autorRepository;
    }
    async create(createBookDto) {
        const autor = await this.autorRepository.findOneBy({
            id: createBookDto.autor,
        });
        if (!autor)
            throw new common_1.NotFoundException('Autor no existe');
        const editorial = await this.editorialRepository.findOneBy({
            id: createBookDto.editorial,
        });
        if (!editorial)
            throw new common_1.NotFoundException('Editorial no existe');
        const genero = await this.generoRepository.findOneBy({
            id: createBookDto.genero,
        });
        if (!genero)
            throw new common_1.NotFoundException('Genero no existe');
        const book = this.bookRepository.create({
            ...createBookDto,
            autor,
            editorial,
            genero,
        });
        return this.bookRepository.save(book);
    }
    async findAll(take, skip, autor, editorial, genero) {
        const where = {};
        if (autor)
            where.autorId = autor;
        if (editorial)
            where.editorialId = editorial;
        if (genero)
            where.generoId = genero;
        const options = {
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
    async findOne(id) {
        const book = await this.bookRepository.findOneBy({ id: id });
        if (!book)
            throw new common_1.NotFoundException('Libro no existe');
        return book;
    }
    async update(id, updateBookDto) {
        const book = await this.findOne(id);
        Object.assign(book, updateBookDto);
        const autor = await this.autorRepository.findOneBy({ id: updateBookDto.autorId });
        if (!autor)
            throw new common_1.NotFoundException('Autor no existe');
        const editorial = await this.editorialRepository.findOneBy({ id: updateBookDto.editorialId });
        if (!editorial)
            throw new common_1.NotFoundException('Editorial no existe');
        const genero = await this.generoRepository.findOneBy({ id: updateBookDto.generoId });
        if (!genero)
            throw new common_1.NotFoundException('Genero no existe');
        book.autor = autor;
        book.editorial = editorial;
        book.genero = genero;
        console.log('para editar', book);
        return this.bookRepository.save(book);
    }
    async remove(id) {
        const book = await this.findOne(id);
        return this.bookRepository.remove(book);
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __param(1, (0, typeorm_1.InjectRepository)(editorial_entity_1.Editorial)),
    __param(2, (0, typeorm_1.InjectRepository)(genero_entity_1.Genero)),
    __param(3, (0, typeorm_1.InjectRepository)(autor_entity_1.Autor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BookService);
//# sourceMappingURL=book.service.js.map