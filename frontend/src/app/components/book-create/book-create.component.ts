import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router, RouterModule } from '@angular/router';
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
  selector: 'app-book-create',
  imports: [modules],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss',
})
export class BookCreateComponent {
  public genero!: IGenero[];
  public autor!: IAutor[];
  public editorial!: IEditorial[];
  public selectAutor: number = 0;
  public selectGenero: number = 0;
  public selectEditorial: number = 0;
  public miFormulario!: FormGroup;
  public loader: boolean = false;
  public id: number = 0;
  public book!: IBook;

  constructor(private apiService: ApiService, private router: Router) {
    this.callGetAutor();
    this.callGetEditorial();
    this.callGetGenero();
    this.miFormulario = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      precio: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.maxLength(10),
      ]),
      disponibilidad: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.maxLength(10),
      ]),
      genero: new FormControl('', [Validators.required]),
      autor: new FormControl('', [Validators.required]),
      editorial: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.miFormulario.valid) {
      this.loader = true;
      const body = {
        titulo: this.miFormulario.get('titulo')?.value,
        precio: Number(this.miFormulario.get('precio')?.value),
        disponibilidad: Number(this.miFormulario.get('disponibilidad')?.value),
        genero: this.miFormulario.get('genero')?.value,
        autor: this.miFormulario.get('autor')?.value,
        editorial: this.miFormulario.get('editorial')?.value,
      };
      this.apiService.createBook(body).subscribe({
        next: (data) => {
          this.loader = false;
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log('Error', err);
          this.loader = false;
        },
      });
    }
  }

  callGetAutor() {
    this.apiService.getAutor().subscribe({
      next: (data) => {
        this.loader = false;
        this.autor = data;
      },
      error: (err) => {
        this.loader = false;
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
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
}
