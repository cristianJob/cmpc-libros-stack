import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public getLogin(username: string, password: string): Observable<any> {
    const body = {
      username,
      password,
    };
    return this.httpClient.post(`${environment.api_url}/user/login`, body);
  }

  public getBook(
    take?: number,
    skip?: number,
    autor?: number,
    editorial?: number,
    genero?: number,
    titulo?: string
  ): Observable<any> {
    const token = localStorage.getItem('AUTH_TOKEN');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let url = `${environment.api_url}/book`;
    if (take) url += `?take=${take}`;
    if (skip) url += `&skip=${skip}`;
    if (autor) url += `&autor=${autor}`;
    if (editorial) url += `&editorial=${editorial}`;
    if (genero) url += `&genero=${genero}`;
    if (titulo) url += `&titulo=${titulo}`;
    return this.httpClient.get(url, {
      headers,
    });
  }

  public getGenero(): Observable<any> {
    const token = localStorage.getItem('AUTH_TOKEN');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get(`${environment.api_url}/genero`, {
      headers,
    });
  }

  public getAutor(): Observable<any> {
    const token = localStorage.getItem('AUTH_TOKEN');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get(`${environment.api_url}/autor`, {
      headers,
    });
  }

  public getEditorial(): Observable<any> {
    const token = localStorage.getItem('AUTH_TOKEN');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get(`${environment.api_url}/editorial`, {
      headers,
    });
  }

  public getBookById(id: number): Observable<any> {
    const token = localStorage.getItem('AUTH_TOKEN');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get(`${environment.api_url}/book/${id}`, {
      headers,
    });
  }

  public editBookById(id: number, body: any): Observable<any> {
    const token = localStorage.getItem('AUTH_TOKEN');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.patch(`${environment.api_url}/book/${id}`, body, {
      headers,
    });
  }

  public createUser(body: any): Observable<any> {
    return this.httpClient.post(`${environment.api_url}/user`, body);
  }

  public createBook(body: any): Observable<any> {
    const token = localStorage.getItem('AUTH_TOKEN');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post(`${environment.api_url}/book/`, body, {
      headers,
    });
  }

    public deleteBook(id: number): Observable<any> {
    const token = localStorage.getItem('AUTH_TOKEN');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.delete(`${environment.api_url}/book/${id}`, {
      headers,
    });
  }
}
