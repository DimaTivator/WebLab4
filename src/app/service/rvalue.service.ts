import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RValueService {
  private RValueSubject = new Subject<number>();
  RValue$ = this.RValueSubject.asObservable();

  updateRValue(newValue: number): void {
    this.RValueSubject.next(newValue);
  }
}
