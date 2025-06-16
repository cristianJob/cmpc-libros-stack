import { CreateEditorialDto } from './dto/create-editorial.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';
import { Editorial } from './entities/editorial.entity';
import { Repository } from 'typeorm';
export declare class EditorialService {
    private readonly editorialRepository;
    constructor(editorialRepository: Repository<Editorial>);
    create(createEditorialDto: CreateEditorialDto): string;
    findAll(): Promise<Editorial[]>;
    findOne(id: number): string;
    update(id: number, updateEditorialDto: UpdateEditorialDto): string;
    remove(id: number): string;
}
