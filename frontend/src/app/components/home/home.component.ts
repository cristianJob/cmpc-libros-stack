import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ApiService } from '../../service/api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormControl, FormsModule } from '@angular/forms';
import { IAutor, IEditorial, IGenero } from '../../interfaces/book';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

const modules = [
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatSelectModule,
  MatFormFieldModule,
  FormsModule,
  MatInputModule,
  ReactiveFormsModule
];

@Component({
  selector: 'app-home',
  imports: [modules, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  searchControl = new FormControl('');
  public loader: boolean = true;
  public books: any;
  public total: any;
  public pageSize: number = 4;
  public page: number = 0;
  public selectAutor: number = 0;
  public selectGenero: number = 0;
  public selectEditorial: number = 0;
  public autor: IAutor[] = [];
  public genero: IGenero[] = [];
  public editorial: IEditorial[] = [];
  constructor(private router: Router, private apiService: ApiService) {
    this.callGetBooks();
    this.callGetAutor();
    this.callGetGenero();
    this.callGetEditorial();
  }

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchText => {
     this.callGetBooks(this.pageSize, this.page, undefined, undefined, undefined, searchText!);
    });
  }

  handlePageEvent(pageEvent: PageEvent) {
    const { previousPageIndex, pageIndex, pageSize, length} = pageEvent;
   this.page = this.pageSize * pageIndex;
    this.callGetBooks(this.pageSize, this.page);
  }

  callGetBooks(take?: number, skip?: number, autor?: number, editorial?: number, genero?: number, titulo?: string) {
    this.loader = true;
    this.apiService.getBook(take, skip, autor, editorial, genero, titulo).subscribe({
      next: (data) => {
        this.books = data.books;
        this.total = data.total;
        this.loader = false;
      },
      error: (err) => {
        if (err.error.message) {
          this.router.navigate(['']);
        } else {
          console.log(err);
        }
        this.loader = false;
      },
    });
  }

  handleFilter() {
    this.callGetBooks(this.pageSize, this.page, this.selectAutor, this.selectEditorial, this.selectGenero);
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

  onInputChange(event: Event): void {
  const valor = (event.target as HTMLInputElement).value;

}

  logout() {
    localStorage.removeItem("AUTH_TOKEN");
     this.router.navigate(['/login']);
  }
}
