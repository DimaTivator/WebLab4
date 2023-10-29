import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Shot} from "../shot";

@Injectable({
  providedIn: 'root'
})
export class ShotsService {

  private baseURL = "http://localhost:8080/api/v1/shots/";

  constructor(private httpClient: HttpClient) {}


  getShotsList(): Observable<Shot[]> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.httpClient.get<Shot[]>(this.baseURL, httpOptions);
  }
}
