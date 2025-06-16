import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
export declare class UserService {
    private readonly userRepository;
    private configService;
    constructor(userRepository: Repository<User>, configService: ConfigService);
    create(createUserDto: CreateUserDto): Promise<CreateUserDto & User>;
    findAll(): Promise<User[]>;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
    generateJWT: (payload: object) => string;
    login(createUserDto: CreateUserDto): Promise<{
        token: string;
    }>;
}
