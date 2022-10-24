import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  form: FormGroup;
  hide = true;

  constructor(private _registration: RegistrationService) {
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordRepeat: new FormControl('', this._passwordRepeatValidator),
    });
  }

  registration(): void {
    //проверка в базе по Http

    this._registration.registration(
      this.form.value.login,
      this.form.value.password,
      this.form.value.passwordRepeat
    );
  }

  private _passwordRepeatValidator(control: any) {
    return { isEqual: control.value === this.form.controls['password'].value };
  }
}
