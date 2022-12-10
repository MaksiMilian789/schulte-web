import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '../shared';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  instruction: string = '';

  constructor(
    private _httpService: HttpService,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._httpService.getInstruction().subscribe((val) => {
      this.instruction = val;
    });
  }

  saveInstruction(): void {
    this._httpService.sendInstruction(this.instruction).subscribe({
      complete: () => {
        this._snackbar.open('Инструкция сохранена');
      },
      error: () => {
        this._snackbar.open('Ошибка при сохранении инструкции');
      },
    });
  }
}
