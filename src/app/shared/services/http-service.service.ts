import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpAllResults, httpResults } from '../models/results';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  /**
   * Отправление результатов теста в БД
   */
  public sendResult(result: httpAllResults): Observable<void> {
    /*return this._http.post(
      `${this._baseUrl}/Users/${idUser}/group/${idGroup}`,
      {}
    );*/
    return of();
  }

  /**
   * Получение результатов теста из БД
   */
  public getResult(): Observable<httpAllResults[]> {
    /*return this._http.get(
      `${this._baseUrl}/Users/${idUser}/group/${idGroup}`,
      {}
    );*/
    let res: httpAllResults[] = [
      {
        login: 'maksim',
        time: 50,
        mistakes: 1,
        date: new Date().toISOString(),
        efficiency: 5,
        workability: 1,
        sustainability: 1,
      },
      {
        login: 'elya',
        time: 30,
        mistakes: 0,
        date: new Date().toISOString(),
        efficiency: 7,
        workability: 1.2,
        sustainability: 0.5,
      },
      {
        login: 'maksim',
        time: 999,
        mistakes: 33,
        date: new Date().toISOString(),
        efficiency: 5,
        workability: 1,
        sustainability: 77,
      },
    ];
    return of(res);
  }

  /**
   * Получение результатов теста в БД
   */
   public getUserResult(login: string): Observable<httpResults[]> {
    /*return this._http.get(
      `${this._baseUrl}/Users/${idUser}/group/${idGroup}`,
      {}
    );*/
    let res: httpResults[] = [
      {
        time: 50,
        mistakes: 1,
        date: new Date().toISOString(),
        efficiency: 0,
        workability: 1,
        sustainability: 1,
      },
      {
        time: 999,
        mistakes: 33,
        date: new Date().toISOString(),
        efficiency: 5,
        workability: 1,
        sustainability: 77,
      },
    ];
    return of(res);
  }

  /**
   * Получение инструкции
   */
   public getInstruction(): Observable<string> {
    /*return this._http.get(
      `${this._baseUrl}/Users/${idUser}/group/${idGroup}`,
      {}
    );*/
    return of();
  }

  /**
   * Получение инструкции
   */
   public sendInstruction(text: string): Observable<void> {
    /*return this._http.post(
      `${this._baseUrl}/Users/${idUser}/group/${idGroup}`,
      {}
    );*/
    return of();
  }
}
