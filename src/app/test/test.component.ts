import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../shared';

import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog';
import { ResultDialogComponent } from '../shared/components/result-dialog';
import { SimpleDialogComponent } from '../shared/components/simple-dialog';
import { httpAllResults, Results } from '../shared/models/results';
import { User } from '../shared/models/user';
import { TimeService } from '../shared/services/time-service.service';
import { resultService } from './result-service.service';

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

  //размерность таблицы теста
  N: number = 5;

  disabled: boolean = true;

  stage!: number;

  mistakes!: number;

  login!: string;

  constructor(
    private _dialog: MatDialog,
    private _result: resultService,
    public timer: TimeService,
    private _httpService: HttpService,
    private _snackbar: MatSnackBar,
    private _router: Router,
  ) {
    this.buildSequence();
    this.buildMatrix();

    if (sessionStorage.getItem('auth') != null) {
      //получение информации о пользователе
      this.login = sessionStorage.getItem('auth') as string;
    }

    _router.events.subscribe((val) => {
      this.timer.isRunning = false;
      this.timer.stopTimer();
  });
  }

  buildSequence(): void {
    this.sequence = [];
    for (let i = 0; i < this.N * this.N; i++) {
      this.sequence.push(i + 1);
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
    this.timer.startTimer();
  }

  stop(): void {
    this.timer.isRunning = false;
    this.disabled = true;
    this.stage = 0;
    this.mistakes = -1;
    this.timer.stopTimer();
  }

  rebuild(): void {
    this.buildSequence();
    this.buildMatrix();
  }

  checkButton(number: any): void {
    if (this.sequence[this.k] == number) {
      this.sequence = this.sequence.slice(1);
      if (number == 1) {
        //number == this.N*this.N
        this.color = 'primary';
        setTimeout(() => {
          this.color = '';
        }, 250);
        this.timer.saveTimeStage();

        if (this.stage == 5) {
          this.timer.isRunning = false;
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

  startWithGuide(): void {
    this._httpService.getInstruction().subscribe((val) => {
      this._dialog
        .open(ConfirmationDialogComponent, {
          data: {
            title: 'Инструкция',
            text: val,
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
    });
  }

  openGuide(): void {
    this._httpService.getInstruction().subscribe((val) => {
      this._dialog.open(SimpleDialogComponent, {
        data: {
          title: 'Инструкция',
          text: val,
        },
        width: '50%',
      });
    });
  }

  openResults(): void {
    let result = this._result.calcResult(
      this.timer.timeStage
    );

    // Отправка результатов в БД
    if(this.login)
      this.sendResult(result);

    this._dialog.open(ResultDialogComponent, {
      data: {
        title: 'Результаты',
        time: this.timer.time,
        mistakes: this.mistakes,
        result: result,
      },
      width: '50%',
    });
  }

  sendResult(result: Results): void {
    var res: httpAllResults = {
      login: this.login,
      time: this.timer.time,
      mistakes: this.mistakes,
      date: new Date().toISOString(),
      efficiency: result.efficiency,
      workability: result.workability,
      sustainability: result.sustainability,
    };

    this._httpService.sendResult(res).subscribe({
      complete: () => {
        this._snackbar.open('Ваши результаты сохранены в базу данных');
      }
    });
  }
}
