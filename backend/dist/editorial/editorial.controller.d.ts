import { EditorialService } from './editorial.service';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';
export declare class EditorialController {
    private readonly editorialService;
    constructor(editorialService: EditorialService);
    create(createEditorialDto: CreateEditorialDto): string;
    findAll(): Promise<import("./entities/editorial.entity").Editorial[]>;
    findOne(id: string): string;
    update(id: string, updateEditorialDto: UpdateEditorialDto): string;
    remove(id: string): string;
}
