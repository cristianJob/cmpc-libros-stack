import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

const mockToken = 'mocked-token';

describe('ApiService', () => {
  localStorage.setItem('AUTH_TOKEN', mockToken);
  let service: ApiService;
  let httpMock: HttpTestingController;
  let httpClientMock: any;

  beforeEach(() => {
    httpClientMock = {
      post: jest.fn(),
      get: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
    };
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        { provide: HttpClient, useValue: httpClientMock },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getLogin', () => {
    const responseMock = { token: 'abc123' };
    httpClientMock.post.mockReturnValue(of(responseMock));

    service.getLogin('user', 'pass').subscribe((res) => {
      expect(res).toEqual(responseMock);
      expect(httpClientMock.post).toHaveBeenCalledWith(
        `${environment.api_url}/user/login`,
        { username: 'user', password: 'pass' }
      );
    });
  });

  it('should call getBook with correct params and headers', () => {
    const mockResponse = { books: [] };
    service.getBook(10, 1, 1, 2, 3, 'titulo').subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(
      `${environment.api_url}/book?take=10&skip=1&autor=1&editorial=2&genero=3&titulo=titulo`
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(
      `Bearer ${mockToken}`
    );
    req.flush(mockResponse);
  });

  it('should call getGenero with auth header', () => {
    const mockResponse = { generos: [] };
    service.getGenero().subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${environment.api_url}/genero`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(
      `Bearer ${mockToken}`
    );
    req.flush(mockResponse);
  });

  it('should call deleteBook with correct id and auth header', () => {
    const id = 1;
    const mockResponse = { deleted: true };
    service.deleteBook(id).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${environment.api_url}/book/${id}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe(
      `Bearer ${mockToken}`
    );
    req.flush(mockResponse);
  });

  it('should call createBook with body and auth header', () => {
    const bookData = { title: 'New Book' };
    const mockResponse = { success: true };
    service.createBook(bookData).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.api_url}/book/`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(bookData);
    expect(req.request.headers.get('Authorization')).toBe(
      `Bearer ${mockToken}`
    );
    req.flush(mockResponse);
  });

  it('should call editBookById with correct URL, body, and headers', () => {
  const mockResponse = { success: true };
  const id = 123;
  const body = { title: 'Updated Book' };

  service.editBookById(id, body).subscribe((res) => {
    expect(res).toEqual(mockResponse);
  });

  const req = httpMock.expectOne(`${environment.api_url}/book/${id}`);
  expect(req.request.method).toBe('PATCH');
  expect(req.request.body).toEqual(body);
  expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
  req.flush(mockResponse);
});

it('should call createUser with correct URL and body', () => {
  const mockResponse = { userId: 1 };
  const body = { username: 'newuser', password: 'pass123' };
  service.createUser(body).subscribe((res) => {
    expect(res).toEqual(mockResponse);
  });
  const req = httpMock.expectOne(`${environment.api_url}/user`);
  expect(req.request.method).toBe('POST');
  expect(req.request.body).toEqual(body);
  req.flush(mockResponse);
});
});
