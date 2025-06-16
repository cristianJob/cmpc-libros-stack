/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/await-thenable */
import { Test, TestingModule } from '@nestjs/testing';
import { AutorController } from './autor.controller';
import { AutorService } from './autor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Autor } from './entities/autor.entity';
import { AuthService } from '../auth/auth.service';
import { CreateAutorDto } from './dto/create-autor.dto';

const mockAutorRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

describe('AutorController', () => {
  let controller: AutorController;
  let autorService: AutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutorController],
      providers: [
        AutorService,
        {
          provide: getRepositoryToken(Autor),
          useValue: mockAutorRepository,
        },
        {
          provide: AuthService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AutorController>(AutorController);
    autorService = module.get<AutorService>(AutorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('debería llamar a autorService.create con el DTO correcto y devolver el resultado', async () => {
      const dto: CreateAutorDto = { name: 'Gabriel García Márquez' };
      const expectedResult = { id: 1, ...dto, books: [] };
      jest.spyOn(autorService, 'create').mockResolvedValue(expectedResult);
      const result = await controller.create(dto);
      expect(autorService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('debería devolver todos los autores desde el servicio', async () => {
      const mockAutores: Autor[] = [
        { id: 1, name: 'Gabriel García Márquez', books: [] },
        { id: 2, name: 'Isabel Allende', books: [] },
      ];

      jest.spyOn(autorService, 'findAll').mockResolvedValue(mockAutores);

      const result = await controller.findAll();

      expect(autorService.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockAutores);
    });
  });

  describe('findOne', () => {
    it('debería devolver un autor por ID', async () => {
      const mockAutor = { id: 1, name: 'Autor de prueba', books: [] };
      autorService.findOne = jest.fn().mockResolvedValue(mockAutor);
      const result = await controller.findOne('1');
      expect(autorService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockAutor);
    });
  });

  describe('update', () => {
    it('debería actualizar un autor y devolverlo', async () => {
      const id = '1';
      const updateAutorDto = { name: 'Nuevo Nombre', books: [] };
      const updatedAutor = { id: 1, ...updateAutorDto };

      autorService.update = jest.fn().mockResolvedValue(updatedAutor);

      const result = await controller.update(id, updateAutorDto);

      expect(autorService.update).toHaveBeenCalledWith(1, updateAutorDto);
      expect(result).toEqual(updatedAutor);
    });
  });

  describe('remove', () => {
    it('debería eliminar un autor por ID', async () => {
      const id = '1';
      const removeResult = { affected: 1 }; // o el resultado que retorne tu servicio

      autorService.remove = jest.fn().mockResolvedValue(removeResult);

      const result = await controller.remove(id);

      expect(autorService.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(removeResult);
    });
  });
});
