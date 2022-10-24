import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { RegistrationService } from '../registration/registration.service';

import { AuthService } from './auth.service';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [],
})
export class AuthComponent {
  form: FormGroup;
  hide = true;

  checkRegistration: Subscription;

  constructor(
    private _snackbar: MatSnackBar,
    private _auth: AuthService,
    private _registration: RegistrationService
  ) {
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.checkRegistration = this._registration.registrationMessage.subscribe(
      (val) => {
        if (val) this._snackbar.open('Регистрация успешна');
      }
    );
  }

  auth(): void {
    if (this.form.invalid) {
      return;
    }

    //проверка на логин/пароль через сервис (с оповещением о неверном через snackbar)
    this._auth.login(this.form.value.login, this.form.value.password);

    /*const formState: { login: string; password: string } = this.form.value;
    this.form.disable();
    this.authService
      .auth(formState.login, formState.password)
      .pipe(finalize(() => this.form.enable()))
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse && error.status == 401) {
            this.snackbar.open('Неверный логин или пароль.');
          } else {
            throw error;
          }
        },
      });*/
  }
}
