import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(private _router: Router) {
    if (sessionStorage.getItem('auth') != null) {
      this.isLoggedIn = true;
    }
  }

  login(login: string, password: string): boolean {
    //авторизация по http
    sessionStorage.setItem('auth', login);
    this.isLoggedIn = true;
    this._router.navigate(['/']);
    return true;
  }

  logout(): void {
    sessionStorage.removeItem('auth');
    this._router.navigate(['/auth']);
  }
}
