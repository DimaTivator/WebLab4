import {Injectable, ViewChild} from '@angular/core';
import {catchError, Observable, Subject, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "../user";
import {CustomAlertComponent} from "../custom-alert/custom-alert.component";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private baseURL = "http://localhost:8080/api/v1/";

  private showAlertSubject = new Subject<number>();
  showAlert$ = this.showAlertSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  authorize(user: User, alert: CustomAlertComponent): Observable<any> {
    return this.httpClient.post(this.baseURL + "authorize", user)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            alert.message = "invalid username or password";
            this.showAlertSubject.next(5000);
          }
          return throwError(error);
        })
      )
  }

  register(user: User, alert: CustomAlertComponent): Observable<any> {
    return this.httpClient.post(this.baseURL + "register", user)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            alert.message = "Username already exists";
            this.showAlertSubject.next(5000);
          }
          return throwError(error);
        })
      )
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }
}

