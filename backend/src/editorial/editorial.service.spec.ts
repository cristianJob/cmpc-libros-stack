import { Test, TestingModule } from '@nestjs/testing';
import { EditorialService } from './editorial.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Editorial } from './entities/editorial.entity';

const mockEditorialRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

describe('EditorialService', () => {
  let service: EditorialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EditorialService,
        {
          provide: getRepositoryToken(Editorial),
          useValue: mockEditorialRepository,
        },
      ],
    }).compile();

    service = module.get<EditorialService>(EditorialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
