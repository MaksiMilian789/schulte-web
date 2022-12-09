import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { httpAllResults, httpResults } from '../models/results';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  _baseUrl: string = 'http://localhost:8080';

  constructor(private _http: HttpClient) {}

  /**
   * Отправление результатов теста в БД
   */
  public sendResult(result: httpAllResults): Observable<void>{
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.post<void>(
      `${this._baseUrl}/saveResults`,
      {
        request: result,
      },
      {
        headers: headers,
      }
    );
  }

  /**
   * Получение результатов теста из БД
   */
  public getResult(): Observable<httpAllResults[]> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.get<httpAllResults[]>(`${this._baseUrl}/getAllResults`, {
      headers: headers,
    });
  }

  /**
   * Получение результатов теста в БД
   */
  public getUserResult(login: string): Observable<httpResults[]> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    var params = new HttpParams().append('login', login);
    return this._http.get<httpResults[]>(`${this._baseUrl}/getResults`, {
      params: params,
      headers: headers,
    });
  }

  /**
   * Получение инструкции
   */
  public getInstruction(): Observable<string> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string
    });
    return this._http.get(`${this._baseUrl}/getInstruction`, {responseType: "text", headers: headers});
  }

  /**
   * Получение инструкции
   */
  public sendInstruction(text: string): Observable<void> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });

    return this._http.post<void>(
      `${this._baseUrl}/editInstruction`,
      {
        textReq: text
      },
      {
        headers: headers,
      }
    );
  }
}
