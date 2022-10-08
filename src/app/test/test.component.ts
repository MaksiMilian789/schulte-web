import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  matrix: number[][] = [];

  constructor() {
    let x = [];
    for (let i = 1; i < 26; i++) {
      x.push(i);
    }

    x.sort(() => Math.random() - 0.5);

    let k = 0;
    for (let i = 0; i < 5; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < 5; j++) {
        this.matrix[i][j] = x[k];
        k++;
      }
    }

    console.log(this.matrix);
  }
}
