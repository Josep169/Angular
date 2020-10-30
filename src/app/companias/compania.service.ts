import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertService } from '../alert/alert.service';
import { Observable, of, throwError } from 'rxjs';
import { Companias } from './companias';
import { LoginService} from '../login/login.service'
import { Router } from '@angular/router'

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type','application/json'),
}

@Injectable({
  providedIn: 'root'
})
export class CompaniaService {

  constructor(private http: HttpClient, private alertService: AlertService, private router: Router, private loginService: LoginService) { }

  urlServer: string = 'http://localhost:8090/'

  getCompanias(): Observable<Companias[]> {
    return this.http.get<Companias[]>(this.urlServer + 'companies',{headers:this.loginService.getAuthHeaders()}).pipe(
      catchError(error => {
        console.error(`getCompanias error: "${error.message}"`);
        if(error.status == 401){
          this.router.navigate(['/login'])
        }else{
          this.alertService.error(`Error al consultar las compañias: "${error.message}"`,{autoClose:false,keepAfterRouteChange:false});
          return throwError(error)
        }
      })
    );
  }
}
