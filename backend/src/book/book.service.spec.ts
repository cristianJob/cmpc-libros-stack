import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Autor } from '../autor/entities/autor.entity';
import { Editorial } from '../editorial/entities/editorial.entity';
import { Genero } from '../genero/entities/genero.entity';

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Autor),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Editorial),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Genero),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
