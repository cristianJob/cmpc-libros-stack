/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/await-thenable */
import { Test, TestingModule } from '@nestjs/testing';
import { GeneroController } from './genero.controller';
import { GeneroService } from './genero.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Genero } from './entities/genero.entity';
import { AuthService } from '../auth/auth.service';
import { CreateGeneroDto } from './dto/create-genero.dto';

const mockGeneroRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

describe('GeneroController', () => {
  let controller: GeneroController;
  let generoService: GeneroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneroController],
      providers: [
        GeneroService,
        {
          provide: getRepositoryToken(Genero),
          useValue: mockGeneroRepository,
        },
        {
          provide: AuthService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<GeneroController>(GeneroController);
    generoService = module.get<GeneroService>(GeneroService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('debería llamar a generoService.create con el DTO correcto y devolver el resultado', async () => {
      const dto: CreateGeneroDto = { name: 'Gabriel García Márquez' };
      const expectedResult = { id: 1, ...dto, books: [] };
      generoService.create = jest.fn().mockResolvedValue(expectedResult);
      const result = await controller.create(dto);
      expect(generoService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('debería devolver todas los generos desde el servicio', async () => {
      const mockGenero = [
        { id: 1, name: 'genero1', books: [] },
        { id: 2, name: 'genero2', books: [] },
      ];
      jest.spyOn(generoService, 'findAll').mockResolvedValue(mockGenero);
      const result = await controller.findAll();
      expect(generoService.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockGenero);
    });
  });

  describe('findOne', () => {
    it('debería devolver un genero por ID', async () => {
      const mockGenero = { id: 1, name: 'Genero1', books: [] };
      generoService.findOne = jest.fn().mockResolvedValue(mockGenero);
      const result = await controller.findOne('1');
      expect(generoService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockGenero);
    });
  });

  describe('update', () => {
    it('debería actualizar un genero y devolverlo', async () => {
      const id = '1';
      const updateGenDto = { name: 'Nuevo Nombre', books: [] };
      const updateGen = { id: 1, ...updateGenDto };
      generoService.update = jest.fn().mockResolvedValue(updateGen);
      const result = await controller.update(id, updateGenDto);
      expect(generoService.update).toHaveBeenCalledWith(1, updateGenDto);
      expect(result).toEqual(updateGen);
    });
  });

  describe('remove', () => {
    it('debería eliminar el genero por ID', async () => {
      const id = '1';
      const removeResult = { affected: 1 };
      generoService.remove = jest.fn().mockResolvedValue(removeResult);
      const result = await controller.remove(id);
      expect(generoService.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(removeResult);
    });
  });
});
