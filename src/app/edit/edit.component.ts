import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  instruction: string = '';

  constructor(private _httpService: HttpService) {}

  ngOnInit(): void {
    //TODO: поулчить инструкцию с сервера
    this.instruction =
      'Вам будут поочередно предложены 5 таблиц с числами от 1 до 25, расположенными в произвольном порядк. Ваша задача - выбирать в каждой таблице числа по возрастанию (от 1 до 25). Выбор осуществляется при помощи клика по ячейке с числом. По окончании прохождения теста вам будут предложены результаты тестирования. После нажатия кнопки "Начать тестирование" тестирование начнётся с новой таблицей.';
  }

  saveInstruction(): void {
    //TODO: отправить инструкцию на сервер
    console.log(this.instruction);
    //Обновить инструкцию
  }
}
