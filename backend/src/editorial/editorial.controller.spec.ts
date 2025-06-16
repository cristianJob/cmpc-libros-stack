/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/await-thenable */
import { Test, TestingModule } from '@nestjs/testing';
import { EditorialController } from './editorial.controller';
import { EditorialService } from './editorial.service';
import { Editorial } from './entities/editorial.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { CreateEditorialDto } from './dto/create-editorial.dto';

const mockEditorialRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

describe('EditorialController', () => {
  let controller: EditorialController;
  let editorialService: EditorialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EditorialController],
      providers: [
        EditorialService,
        {
          provide: getRepositoryToken(Editorial),
          useValue: mockEditorialRepository,
        },
        {
          provide: AuthService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<EditorialController>(EditorialController);
    editorialService = module.get<EditorialService>(EditorialService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('debería llamar a autorService.create con el DTO correcto y devolver el resultado', async () => {
      const dto: CreateEditorialDto = { name: 'Gabriel García Márquez' };
      const expectedResult = { id: 1, ...dto, books: [] };
      editorialService.create = jest.fn().mockResolvedValue(expectedResult);
      const result = await controller.create(dto);
      expect(editorialService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('debería devolver todas las editoriales desde el servicio', async () => {
      const mockAutores = [
        { id: 1, name: 'editorial1', books: [] },
        { id: 2, name: 'editorial2', books: [] },
      ];
      jest.spyOn(editorialService, 'findAll').mockResolvedValue(mockAutores);
      const result = await controller.findAll();
      expect(editorialService.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockAutores);
    });
  });

  describe('findOne', () => {
    it('debería devolver una editorial por ID', async () => {
      const mockEditorial = { id: 1, name: 'Editorial1', books: [] };
      editorialService.findOne = jest.fn().mockResolvedValue(mockEditorial);
      const result = await controller.findOne('1');
      expect(editorialService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockEditorial);
    });
  });

  describe('update', () => {
    it('debería actualizar un autor y devolverlo', async () => {
      const id = '1';
      const updateEditDto = { name: 'Nuevo Nombre', books: [] };
      const updateEdit = { id: 1, ...updateEditDto };
      editorialService.update = jest.fn().mockResolvedValue(updateEdit);
      const result = await controller.update(id, updateEditDto);
      expect(editorialService.update).toHaveBeenCalledWith(1, updateEditDto);
      expect(result).toEqual(updateEdit);
    });
  });

  describe('remove', () => {
    it('debería eliminar la editorial por ID', async () => {
      const id = '1';
      const removeResult = { affected: 1 };
      editorialService.remove = jest.fn().mockResolvedValue(removeResult);
      const result = await controller.remove(id);
      expect(editorialService.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(removeResult);
    });
  });
});
