import { Test, TestingModule } from '@nestjs/testing';
import { AutorService } from './autor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Autor } from './entities/autor.entity';

describe('AutorService', () => {
  let service: AutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AutorService,
        {
          provide: getRepositoryToken(Autor),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AutorService>(AutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
