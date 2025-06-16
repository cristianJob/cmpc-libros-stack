import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';
import { Autor } from './entities/autor.entity';
import { Repository } from 'typeorm';
export declare class AutorService {
    private readonly autorRepository;
    constructor(autorRepository: Repository<Autor>);
    create(createAutorDto: CreateAutorDto): Promise<CreateAutorDto & Autor>;
    findAll(): Promise<Autor[]>;
    findOne(id: number): string;
    update(id: number, updateAutorDto: UpdateAutorDto): string;
    remove(id: number): string;
}
