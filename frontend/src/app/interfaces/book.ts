export interface IBook {
  id: number;
  titulo: string;
  precio: number;
  disponibilidad: number;
  genero: IGenero;
  autor: IAutor;
  editorial: IEditorial;
}

export interface IAutor  {
  id: number;
  name: string;
}

export interface IGenero {
  id: number;
  name: string;
}

export interface IEditorial {
  id: number;
  name: string;
}
