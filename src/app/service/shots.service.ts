import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, Subject, throwError} from "rxjs";
import {Shot} from "../shot";

@Injectable({
  providedIn: 'root'
})
export class ShotsService {

  private baseURL = "http://localhost:8080/api/v1/shots";

  private showAlertSubject = new Subject<number>();
  showAlert$ = this.showAlertSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  getShotsList(): Observable<Shot[]> {

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Access-Control-Allow-Origin': '*'
    //   })
    // };
    // return this.httpClient.get<Shot[]>(this.baseURL, httpOptions);
    return this.httpClient.get<Shot[]>(this.baseURL);
  }

  // @ts-ignore
  createShot(shot: Shot, customAlert: CustomAlertComponent): Observable<any> {
    return this.httpClient.post(this.baseURL, shot)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            console.log("call display alert");
            this.showAlertSubject.next(5000);
          }
          return throwError(error);
        })
      )
  }

  deleteAllShots(): Observable<any> {
    return this.httpClient.delete(this.baseURL)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }
}
