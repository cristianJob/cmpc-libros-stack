import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideHttpClient } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockApiService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockApiService = {
      getLogin: jest.fn().mockReturnValue(of({ token: 'dummy-token' })),
    };
    mockRouter = {
      navigate: jest.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LoginComponent,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: ApiService, useValue: mockApiService },
        provideHttpClient(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call apiService on submit if form valid', () => {
    component.form.controls['username'].setValue('user');
    component.form.controls['password'].setValue('pass');
    const fakeResponse = { token: '12345' };
    mockApiService.getLogin.mockReturnValue(of(fakeResponse));
    component.submit();
    expect(mockApiService.getLogin).toHaveBeenCalledWith('user', 'pass');
  });

    it('should handle error from apiService', () => {
    component.form.controls['username'].setValue('user');
    component.form.controls['password'].setValue('pass');
    const errorResponse = { error: { message: 'Invalid credentials' } };
    mockApiService.getLogin.mockReturnValue(throwError(() => errorResponse));
    component.submit();
    expect(component.error).toBe('Invalid credentials');
    expect(component.loader).toBe(false);
  });

  it('should set generic error if error message not present', () => {
    component.form.controls['username'].setValue('user');
    component.form.controls['password'].setValue('pass');
    const errorResponse = { error: {} };
    mockApiService.getLogin.mockReturnValue(throwError(() => errorResponse));
    component.submit();
    expect(component.error).toBe('Error');
    expect(component.loader).toBe(false);
  });

});
