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

  private getHeaders(): HttpHeaders {
    const username = localStorage.getItem("username") ?? "default";
    return new HttpHeaders().set("username", username);
  }

  getShotsList(): Observable<Shot[]> {
    return this.httpClient.get<Shot[]>(this.baseURL, { headers: this.getHeaders() });
  }

  // @ts-ignore
  createShot(shot: Shot): Observable<any> {
    return this.httpClient.post(this.baseURL, shot, { headers: this.getHeaders() })
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
    return this.httpClient.delete(this.baseURL, { headers: this.getHeaders() })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }
}
