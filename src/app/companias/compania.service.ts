import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../alert/alert.service';
import { Observable, of, throwError } from 'rxjs';
import { Companias } from './companias';

@Injectable({
  providedIn: 'root'
})
export class CompaniaService {

  constructor(private http: HttpClient, private alertService: AlertService) { }

  urlServer: string = 'http://localhost:8090/'

  getCompanias(): Observable<Companias[]> {
    return this.http.get<Companias[]>(this.urlServer + 'companies').pipe(
      catchError(error => {
        console.error(`getCompanie error: "${error.message}"`);
        this.alertService.error(`Error al consultar las compañias: "${error.message}"`, {autoClose:true, KeepAfterRouteChange: false});
        return throwError(error);
      })
    );
  }
}
