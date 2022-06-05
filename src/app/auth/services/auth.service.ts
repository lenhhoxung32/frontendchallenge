import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Credentials, User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly _http: HttpClient) {}

  login(credentials: Credentials): Observable<User> {
    return this._http
      .get<any>('assets/data.json')
      .pipe(map((response) => response.currentUser as User));
  }

  logout() {
    return of(true);
  }
}
