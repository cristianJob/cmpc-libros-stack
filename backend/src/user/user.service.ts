import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  generateJWT = (payload: object) => {
    const token = sign(payload, this.configService.get('JWT_SECRET')!, {
      expiresIn: '180d',
    });
    return token;
  };

  async login(createUserDto: CreateUserDto) {
    const { password, username } = createUserDto;
    const user = await this.userRepository.findOne({
      where: {
        username,
        password,
      },
    });
    if (!user) throw new NotFoundException('Credenciales invalidas');
    const token = this.generateJWT({ id: user.id });
    return { token };
  }
}
