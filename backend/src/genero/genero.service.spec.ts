import { Test, TestingModule } from '@nestjs/testing';
import { GeneroService } from './genero.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Genero } from './entities/genero.entity';

describe('GeneroService', () => {
  let service: GeneroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeneroService,
        {
          provide: getRepositoryToken(Genero),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<GeneroService>(GeneroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
