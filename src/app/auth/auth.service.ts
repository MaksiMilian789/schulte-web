import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { httpLogin, User } from '../shared/models/user';
import { toHttpParams } from '../shared/services/params';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  _baseUrl: string = 'http://localhost:8080';

  constructor(
    private _router: Router,
    private _snackbar: MatSnackBar,
    private _http: HttpClient
  ) {
    if (sessionStorage.getItem('auth') != null) {
      this.isLoggedIn = true;
    }
  }

  login(login: string, password: string): void {
    this.httpAuth(login, password).subscribe(
      (res) => {
        if (res.token != null) {
          sessionStorage.setItem('auth', login);
          sessionStorage.setItem('jwt', res.token);
          this.isLoggedIn = true;
          this._router.navigate(['/']);
        }
      },
      (err) => {
        this._snackbar.open('Неверный логин или пароль');
      }
    );
  }

  httpAuth(login: string, password: string): Observable<httpLogin> {
    return this._http.post<httpLogin>(`${this._baseUrl}/login`, {
      login: login,
      password: password,
    });
  }

  httpGetUser(login: string): Observable<User> {
    var params = new HttpParams().append('login', login);
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.get<User>(`${this._baseUrl}/getUserInfo`, {
      params: params,
      headers: headers,
    });
  }

  logout(): void {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });

    this._http.get<User>(`${this._baseUrl}/logout`, {
      headers: headers,
    });

    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('jwt');
    this._router.navigate(['/auth']);
  }
}
