import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor() {
    if (sessionStorage.getItem('auth') != null) {
      this.isLoggedIn = true;
      console.log("auth")
    }
  }
}
