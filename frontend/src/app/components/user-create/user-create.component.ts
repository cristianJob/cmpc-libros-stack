import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  ReactiveFormsModule,
  MatProgressSpinnerModule,
];

@Component({
  selector: 'app-user-create',
  imports: [modules],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {
  constructor(private router: Router, private apiService: ApiService) {}

  public error: string = '';
  public loader: boolean = false;
  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  submit() {
    if (this.form.valid) {
      this.loader = true;
      const username = this.form.get('username')?.value ?? '';
      const password = this.form.get('password')?.value ?? '';
      const body = {
        username,
        password
      }
      this.apiService.createUser(body).subscribe({
        next: () => {
          this.loader = false;
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if (err.error.message) {
            this.error = err.error.message;
          } else {
            this.error = 'Error';
          }
          this.loader = false;
        },
      });
    }
  }
}
