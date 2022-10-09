import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  matrix: number[][] = [];
  sequence: number[] = [];

  k = 0;
  color = '';

  constructor(private _snackbar: MatSnackBar) {
    for (let i = 1; i < 26; i++) {
      this.sequence.push(i);
    }

    let random = Array.from(this.sequence);
    random.sort(() => Math.random() - 0.5);

    let k = 0;
    for (let i = 0; i < 5; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < 5; j++) {
        this.matrix[i][j] = random[k];
        k++;
      }
    }
  }

  checkButton(number: any): void {
    if (this.sequence[this.k] == number) {
      this.sequence = this.sequence.slice(1);
    } else {
      this.color = 'warn';
      setTimeout(() => {
        this.color = '';
      }, 250);
    }
  }
}
