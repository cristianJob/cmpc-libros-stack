import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { UserCreateComponent } from './user-create.component';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;
  let apiServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    apiServiceMock = {
      createUser: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [UserCreateComponent],
       providers: [ApiService, provideHttpClient(),
        { provide: ApiService, useValue: apiServiceMock },
        { provide: Router, useValue: routerMock },
       ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should call apiService.createUser and redirect to login on success', () => {
    const mockResponse = of({});
    apiServiceMock.createUser.mockReturnValue(mockResponse);

    component.form.setValue({ username: 'testuser', password: '123456' });
    component.submit();

    expect(component.loader).toBeFalsy();
    expect(apiServiceMock.createUser).toHaveBeenCalledWith({
      username: 'testuser',
      password: '123456',
    });
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    expect(component.error).toBe('');
  });

    it('should handle error with backend message', () => {
    const errorResponse = throwError(() => ({
      error: { message: 'Usuario ya existe' },
    }));
    apiServiceMock.createUser.mockReturnValue(errorResponse);

    component.form.setValue({ username: 'testuser', password: '123456' });
    component.submit();

    expect(component.loader).toBeFalsy();
    expect(component.error).toBe('Usuario ya existe');
  });

    it('should handle error without message from backend', () => {
    const errorResponse = throwError(() => ({
      error: {},
    }));
    apiServiceMock.createUser.mockReturnValue(errorResponse);

    component.form.setValue({ username: 'testuser', password: '123456' });
    component.submit();

    expect(component.loader).toBeFalsy();
    expect(component.error).toBe('Error');
  });

    it('should not submit if the form is invalid', () => {
    component.form.setValue({ username: '', password: '' });
    component.submit();

    expect(apiServiceMock.createUser).not.toHaveBeenCalled();
    expect(component.loader).toBeFalsy();
  });
});
