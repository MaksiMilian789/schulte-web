import { Component, Inject } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Results } from '../../models/results';
import { timeService } from '../../services/time-service.service';

/**
 * Конфигурация для диалогового окна подтверждения.
 */
export interface ResultDialogData {
  /** Заголовок окна. */
  title: string;

  /** Время. */
  time: number;

  /** Ошибки. */
  mistakes: number;

  /** Результаты. */
  result: Results;

  /** Текст кнопки подтверждения. По умолчанию: `ОК`. */
  actionText?: string;

  /** Цвет кнопки подтверждения. */
  actionColor?: ThemePalette;
}

/**
 * Диалоговое окно подтверждения действия.
 */
@Component({
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.scss'],
})
export class ResultDialogComponent {
  time: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ResultDialogData,
    private sanitizer: DomSanitizer,
    private _timer: timeService
  ) {
    data.actionText = data.actionText ?? 'Ок';
    this.time = this._timer.getDisplayTimer(data.time);
  }
}
