import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { timer } from 'rxjs';
import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog';
import { ResultDialogComponent } from '../shared/components/result-dialog';
import { SimpleDialogComponent } from '../shared/components/simple-dialog';
import { resultService } from './result-service.service';

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

  //размерность таблицы теста
  N: number = 5;

  disabled: boolean = true;

  stage!: number;

  mistakes!: number;

  time: number = 0;
  isRunning: boolean = false;
  timerDisplay!: string;
  timeStage: number[] = [];

  constructor(private _dialog: MatDialog, private _result: resultService) {
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
    for (let i = 0; i < this.N*this.N; i++) {
      this.sequence.push(i+1);
    }
  }

  buildMatrix(): void {
    this.matrix = [];
    let random = Array.from(this.sequence);
    random.sort(() => Math.random() - 0.5);

    let k = 0;
    for (let i = 0; i < this.N; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < this.N; j++) {
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
    this.timeStage = [];
  }

  stop() {
    this.isRunning = false;
    this.disabled = true;
    this.stage = 0;
    this.mistakes = -1;
    this.time = 0;
    this.timerDisplay = '';
    this.timeStage = [];
  }

  rebuild(): void {
    this.buildSequence();
    this.buildMatrix();
  }

  checkButton(number: any): void {
    if (this.sequence[this.k] == number) {
      this.sequence = this.sequence.slice(1);
      if (number == 3) { //this.N*N
        this.color = 'primary';
        setTimeout(() => {
          this.color = '';
        }, 250);
        this.timeStage.push(this.time);

        if (this.stage == 5) {
          this.isRunning = false;
          this.disabled = true;
          this.openResults();
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

  openResults(): void {
    let result = this._result.calcResult(this.timeStage, this.mistakes, this.time);

    this._dialog.open(ResultDialogComponent, {
      data: {
        title: 'Результаты',
        time: this.time,
        mistakes: this.mistakes,
        result: result,
      },
      width: '50%',
    });
  }
}
