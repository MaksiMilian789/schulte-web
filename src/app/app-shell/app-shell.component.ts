import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
})
export class AppShellComponent {
  fio = 'admin';

  constructor(private router: Router) {}

  logout(): void {
    sessionStorage.removeItem('auth');
    this.router.navigate(['/auth']);
  }

  private _formatFio(fio: string): string {
    let result = '';
    const parts = fio.split(' ');
    result += parts[0];
    if (parts.length > 1) {
      result += ' ' + parts[1][0] + '.';
    }
    if (parts.length > 2) {
      result += ' ' + parts[2][0] + '.';
    }
    return result;
  }
}
