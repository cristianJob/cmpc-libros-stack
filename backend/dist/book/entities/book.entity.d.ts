import { Autor } from 'src/autor/entities/autor.entity';
import { Editorial } from 'src/editorial/entities/editorial.entity';
import { Genero } from 'src/genero/entities/genero.entity';
export declare class Book {
    id: number;
    titulo: string;
    precio: number;
    disponibilidad: number;
    generoId: number;
    autorId: number;
    editorialId: number;
    autor: Autor;
    editorial: Editorial;
    genero: Genero;
}
