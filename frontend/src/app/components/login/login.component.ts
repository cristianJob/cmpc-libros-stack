import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  ReactiveFormsModule,
  MatProgressSpinnerModule,
];

@Component({
  selector: 'app-login',
  imports: [modules, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private router: Router, private apiService: ApiService) {}

  public error: string = '';
  public data: any;
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
      this.apiService.getLogin(username, password).subscribe({
        next: (data) => {
          const { token } = data;
           localStorage.setItem("AUTH_TOKEN", token)
           this.loader = false;
          this.router.navigate(['/home']);
        },
        error: (err) => {
          if(err.error.message) {
             this.error = err.error.message;
          } else {
          this.error = 'Error'
          }
          this.loader = false;
        }
      });
    }
  }
}
