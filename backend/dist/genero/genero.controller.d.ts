import { GeneroService } from './genero.service';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
export declare class GeneroController {
    private readonly generoService;
    constructor(generoService: GeneroService);
    create(createGeneroDto: CreateGeneroDto): string;
    findAll(): Promise<import("./entities/genero.entity").Genero[]>;
    findOne(id: string): string;
    update(id: string, updateGeneroDto: UpdateGeneroDto): string;
    remove(id: string): string;
}
