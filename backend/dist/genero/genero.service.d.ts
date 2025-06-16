import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { Genero } from './entities/genero.entity';
import { Repository } from 'typeorm';
export declare class GeneroService {
    private readonly generoRepository;
    constructor(generoRepository: Repository<Genero>);
    create(createGeneroDto: CreateGeneroDto): string;
    findAll(): Promise<Genero[]>;
    findOne(id: number): string;
    update(id: number, updateGeneroDto: UpdateGeneroDto): string;
    remove(id: number): string;
}
