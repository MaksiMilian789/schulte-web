import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { httpLogin, User } from '../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  _baseUrl: string = "localhost:8080"

  constructor(private _router: Router, private _http: HttpClient) {
    if (sessionStorage.getItem('auth') != null) {
      this.isLoggedIn = true;
    }
  }

  login(login: string, password: string): boolean {
    if (this.httpAuth(login, password)) {
      sessionStorage.setItem('auth', login);
      this.isLoggedIn = true;
      this._router.navigate(['/']);
      return true;
    } else {
      return false;
    }
  }

  httpAuth(login: string, password: string): Observable<httpLogin> {
    return this._http.post<httpLogin>(`${this._baseUrl}/login`, {
      login: login,
      password: password
    });
  }

  httpGetUser(): Observable<User> {
    /*return this._http.get(
      `${this._baseUrl}/Users/${idUser}/group/${idGroup}`,
      {}
    );*/
    let res: User = {
      login: 'maksim',
      role: 1,
    };
    return of(res);
  }

  logout(): void {
    sessionStorage.removeItem('auth');
    this._router.navigate(['/auth']);
  }
}
