import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [],
})
export class AuthComponent {
  form: FormGroup;
  hide = true;

  constructor(
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    sessionStorage.setItem("auth", this.form.value.login);

    //проверка на логин/пароль
    this.router.navigate(['/']);

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
