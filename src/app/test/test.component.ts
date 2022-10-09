import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { timer } from 'rxjs';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog';
import { SimpleDialogComponent } from '../shared/simple-dialog';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  //перемешанная матрица кнопок
  matrix: number[][] = [];

  //шаблон верной последовательности
  sequence: number[] = [];

  //индекс в шаблоне
  k: number = 0;

  //цветовая индикация
  color: string = '';

  disabled: boolean = true;

  stage!: number;

  mistakes!: number;

  time: number = 0;
  isRunning: boolean = false;
  timerDisplay!: string;

  constructor(private _dialog: MatDialog) {
    this.buildSequence();
    this.buildMatrix();
  }

  ngOnInit() {
    timer(0, 1000).subscribe((ellapsedCycles) => {
      if (this.isRunning) {
        this.time++;
        this.timerDisplay = this.getDisplayTimer(this.time);
      }
    });
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
    this.stage = 1;
    this.mistakes = 0;
    this.time = 0;
    this.timerDisplay = '00:00';
    this.isRunning = true;
  }

  stop() {
    this.isRunning = false;
    this.disabled = true;
    this.stage = 0;
    this.mistakes = -1;
    this.time = 0;
    this.timerDisplay = '';
  }

  rebuild(): void {
    this.buildSequence();
    this.buildMatrix();
  }

  checkButton(number: any): void {
    if (this.sequence[this.k] == number) {
      this.sequence = this.sequence.slice(1);
      if (number == 3) {
        this.color = 'primary';
        setTimeout(() => {
          this.color = '';
        }, 250);

        if (this.stage == 5) {
          this.isRunning = false;
          this.disabled = true;
          return;
        }

        this.stage++;
        this.rebuild();
      }
    } else {
      this.mistakes++;
      this.color = 'warn';
      setTimeout(() => {
        this.color = '';
      }, 250);
    }
  }

  getDisplayTimer(time: number): string {
    const minutes = '0' + Math.floor((time % 3600) / 60);
    const seconds = '0' + Math.floor((time % 3600) % 60);

    return (
      minutes.slice(-2, -1) +
      minutes.slice(-1) +
      ':' +
      seconds.slice(-2, -1) +
      seconds.slice(-1)
    );
  }

  startWithGuide(): void {
    //TODO: получение инструкции по http
    let guide =
      'Вам будут поочередно предложены 5 таблиц с числами от 1 до 25, расположенными в произвольном порядк. Ваша задача - выбирать в каждой таблице числа по возрастанию (от 1 до 25). Выбор осуществляется при помощи клика по ячейке с числом. По окончании прохождения теста вам будут предложены результаты тестирования. После нажатия кнопки "Начать тестирование" тестирование начнётся с новой таблицей.';

    this._dialog
      .open(ConfirmationDialogComponent, {
        data: {
          title: 'Инструкция',
          text: guide,
          actionText: 'Начать тест',
          actionColor: 'primary',
        },
        width: '50%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val) {
          this.start();
        }
      });
  }

  openGuide(): void {
    //TODO: получение инструкции по http
    let guide =
      'Вам будут поочередно предложены 5 таблиц с числами от 1 до 25, расположенными в произвольном порядк. Ваша задача - выбирать в каждой таблице числа по возрастанию (от 1 до 25). Выбор осуществляется при помощи клика по ячейке с числом. По окончании прохождения теста вам будут предложены результаты тестирования. После нажатия кнопки "Начать тестирование" тестирование начнётся с новой таблицей.';

    this._dialog.open(SimpleDialogComponent, {
      data: {
        title: 'Инструкция',
        text: guide,
      },
      width: '50%',
    });
  }
}
