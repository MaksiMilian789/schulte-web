import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../shared/models/user';

@Component({
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
})
export class AppShellComponent {
  user$!: Observable<User>;

  userLogin: string = "";

  constructor(private _auth: AuthService) {
    if (sessionStorage.getItem('auth') != null) {
      //получение информации о пользователе
      this.user$ = this._auth.httpGetUser(sessionStorage.getItem('auth') as string);
      this.userLogin = sessionStorage.getItem('auth') as string;
    }
  }

  logout(): void {
    this._auth.logout();
  }
}
