import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as jwt from 'jsonwebtoken';
import { NotFoundException } from '@nestjs/common';

const mockUser = {
  id: 1,
  username: 'testuser',
  password: 'testpass',
};

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'token-fake'),
}));

describe('UserService', () => {
  let service: UserService;
  let userRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {},
        },
      ],
    }).compile();

    userRepository = module.get(getRepositoryToken(User));
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should save a user', async () => {
      userRepository.save.mockResolvedValue(mockUser);
      const result = await service.create(mockUser as CreateUserDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [
        { id: 1, username: 'user1', password: 'pass1' },
        { id: 2, username: 'user2', password: 'pass2' },
      ];
      userRepository.find.mockResolvedValue(users);
      const result = await service.findAll();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a string with the user id', () => {
      const id = 42;
      const result = service.findOne(id);
      expect(result).toBe(`This action returns a #${id} user`);
    });
  });

  describe('update', () => {
    it('should return a string confirming update of the user id', () => {
      const id = 5;
      const updateUserDto = { username: 'newname', password: 'newpass' }; // Puedes usar cualquier objeto válido
      const result = service.update(id, updateUserDto);
      expect(result).toBe(`This action updates a #${id} user`);
    });
  });

  describe('remove', () => {
    it('should return a string confirming removal of the user id', () => {
      const id = 10;
      const result = service.remove(id);
      expect(result).toBe(`This action removes a #${id} user`);
    });
  });

  describe('generateJWT', () => {
    it('should generate a JWT token', () => {
      const mockConfigService = {
        get: jest.fn().mockReturnValue('secret'),
      } as unknown as ConfigService;
      const mockRepository = {} as jest.Mocked<Repository<User>>;
      const service = new UserService(mockRepository, mockConfigService);
      const token = service.generateJWT({ id: 1 });
      expect(token).toBe('token-fake');
      expect(jwt.sign).toHaveBeenCalledWith({ id: 1 }, 'secret', {
        expiresIn: '180d',
      });
    });
  });

  describe('login', () => {
    const mockUser = { id: 1, username: 'testuser', password: 'testpass' };
    const createUserDto = { username: 'testuser', password: 'testpass' };

    beforeEach(() => {
      jest.spyOn(service, 'generateJWT').mockReturnValue('fake.token');
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return a token if user is found', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(mockUser);
      const result = await service.login(createUserDto);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: {
          username: createUserDto.username,
          password: createUserDto.password,
        },
      });
      expect(service.generateJWT).toHaveBeenCalledWith({ id: mockUser.id });
      expect(result).toEqual({ token: 'fake.token' });
    });

    it('should throw NotFoundException if user not found', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(null);
      await expect(service.login(createUserDto)).rejects.toThrow(
        NotFoundException,
      );
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: {
          username: createUserDto.username,
          password: createUserDto.password,
        },
      });
    });
  });
});
