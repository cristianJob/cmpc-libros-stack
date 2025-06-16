import { Component, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { IAutor, IBook, IEditorial, IGenero } from '../../interfaces/book';
import { RouterModule } from '@angular/router';

const modules = [
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  FormsModule,
  RouterModule,
];

@Component({
  selector: 'app-book-detail',
  imports: [modules],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BookDetailComponent {
  public genero!: IGenero[];
  public autor!: IAutor[];
  public editorial!: IEditorial[];
  public selectAutor: number = 0;
  public selectGenero: number = 0;
  public selectEditorial: number = 0;
  public miFormulario!: FormGroup;
  public loader: boolean = true;
  public id: number = 0;
  public book!: IBook;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam !== null ? Number(idParam) : 0;
    this.callBook();
  }

  callBook() {
    this.apiService.getBookById(this.id).subscribe({
      next: (data) => {
        this.callGetAutor();
        this.callGetEditorial();
        this.callGetGenero();
        this.loader = false;
        this.book = data;
        this.miFormulario = new FormGroup({
          titulo: new FormControl(this.book.titulo, [Validators.required]),
          precio: new FormControl(this.book.precio, [
            Validators.required,
            Validators.pattern(/^\d+$/),
            Validators.maxLength(10),
          ]),
          disponibilidad: new FormControl(this.book.disponibilidad, [
            Validators.required,
            Validators.pattern(/^\d+$/),
            Validators.maxLength(10),
          ]),
          genero: new FormControl(this.book.genero.id, [Validators.required]),
          autor: new FormControl(this.book.autor.id, [Validators.required]),
          editorial: new FormControl(this.book.editorial.id, [
            Validators.required,
          ]),
        });
      },
      error: (err) => {
        this.loader = false;
        if (err.status === 401) {
          this.router.navigate(['/login']);
        } else {
          console.log('Error', err);
        }
      },
    });
  }

  callGetAutor() {
    this.apiService.getAutor().subscribe({
      next: (data) => {
        this.loader = false;
        this.autor = data;
      },
      error: (err) => {
        this.loader = false;
      },
    });
  }

  callGetGenero() {
    this.apiService.getGenero().subscribe({
      next: (data) => {
        this.loader = false;
        this.genero = data;
      },
      error: (err) => {
        this.loader = false;
      },
    });
  }

  callGetEditorial() {
    this.apiService.getEditorial().subscribe({
      next: (data) => {
        this.loader = false;
        this.editorial = data;
      },
      error: (err) => {
        this.loader = false;
      },
    });
  }

  onSubmit() {
    if (this.miFormulario.valid) {
      this.loader = true;
      const body = {
        titulo: this.miFormulario.get('titulo')?.value,
        precio: Number(this.miFormulario.get('precio')?.value),
        disponibilidad: Number(this.miFormulario.get('disponibilidad')?.value),
        generoId: this.miFormulario.get('genero')?.value,
        autorId: this.miFormulario.get('autor')?.value,
        editorialId: this.miFormulario.get('editorial')?.value,
      };
      this.apiService.editBookById(this.id, body).subscribe({
        next: (data) => {
          this.loader = false;
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.loader = false;
        },
      });
    }
  }

  deleteBook() {
    this.loader = true;
    this.apiService.deleteBook(this.book.id).subscribe({
      next: (data) => {
        this.loader = false;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loader = false;
      },
    });
  }
}
