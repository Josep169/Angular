import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Juego } from './juego';
import { catchError } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../alert/alert.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class JuegoService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private alertService: AlertService) { }

  urlServer: string = 'http://localhost:8090/'

  getJuegos(): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.urlServer + 'juegos').pipe(
      catchError(error => {
        console.error(`getJuego error: "${error.message}"`);
        this.alertService.error(`Error al consultar los juegos: "${error.message}"`, {autoClose:true, KeepAfterRouteChange: false});
        return throwError(error);
      })
    );
  }
  createJuego(juego: Juego): Observable<Juego> {
    return this.http.post<Juego>(this.urlServer + 'juegos', juego, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(`create error: "${e.message}"`);
        if(e.status == 400){
          e.error.errorMessage.replace("["," ").replace("]"," ").split(", ").reverse().forEach(errorM => {
            this.alertService.error(`${errorM}`,{autoClose:false,keepAfterRouteChange:false});
          });
        }else{
          this.alertService.error(`Error al crear el juego: "${e.message}"`,{autoClose:false,keepAfterRouteChange:false});
          return throwError(e)
        }
      })
    );
  }
  getJuego(id: number): Observable<Juego> {
    return this.http.get<Juego>(`${this.urlServer}juegos/${id}`).pipe(
      catchError(e => {
        console.error(`getJuego error: "${e.message}"`);
        this.alertService.error(`Error al consultar el juego: "${e.message}"`);
        return throwError(e);
      })
    );
  }
  update(juego: Juego): Observable<Juego> {
    return this.http.put<Juego>(`${this.urlServer}juegos/${juego.idJuego}`, juego, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(`update error: "${e.message}"`);
        if(e.status == 400){
          e.error.errorMessage.replace("["," ").replace("]"," ").split(", ").reverse().forEach(errorM => {
            this.alertService.error(`${errorM}`,{autoClose:false,keepAfterRouteChange:false});
          });
        }else{
          this.alertService.error(`Error al editar el juego: "${e.message}"`,{autoClose:false,keepAfterRouteChange:false});
          return throwError(e)
        }
      })
    );
    }
    deleteJuego(id: number): Observable<any> {
      return this.http.delete(`${this.urlServer}juegos/${id}`).pipe(
        catchError(error => {
          console.error(`deleteJuego error: "${error.message}"`);
          this.alertService.error(`Error al eliminar el juego: "${error.message}"`, {autoClose:true, KeepAfterRouteChange: false});
          return throwError(error);
        })
      );
    }
}
