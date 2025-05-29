import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CsrfService {
  constructor(private http: HttpClient) {}

  /** Obtiene el token y deja que el browser almacene la cookie */
  getToken(): Observable<string> {
    return this.http
      .get<{ csrfToken: string }>('http://localhost:3000/csrf-token', {
        withCredentials: true
      })
      .pipe(map(res => res.csrfToken));
  }
}