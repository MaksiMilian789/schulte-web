import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  //перемешанная матрица кнопок
  matrix: number[][] = [];

  //шаблон верной последовательности
  sequence: number[] = [];

  //индекс в шаблоне
  k: number = 0;

  //цветовая индикация
  color: string = '';

  disabled: boolean = true;

  stage: number = 1;

  constructor(private _snackbar: MatSnackBar) {
    this.buildSequence();
    this.buildMatrix();
  }

  buildSequence(): void {
    this.sequence = [];
    for (let i = 1; i < 26; i++) {
      this.sequence.push(i);
    }
  }

  buildMatrix(): void {
    this.matrix = [];
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

  start(): void {
    this.buildSequence();
    this.buildMatrix();
    this.disabled = false;
  }

  rebuild(): void {
    this.buildSequence();
    this.buildMatrix();
  }

  checkButton(number: any): void {
    if (this.sequence[this.k] == number) {
      this.sequence = this.sequence.slice(1);
      if (number == 25) {
        this.color = 'primary';
        setTimeout(() => {
          this.color = '';
        }, 250);
        if(this.stage == 5) {
          this.disabled = true;
        }        
        this.stage++;
        this.rebuild();
      }
    } else {
      this.color = 'warn';
      setTimeout(() => {
        this.color = '';
      }, 250);
    }
  }
}
