import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RValueService {
  private RValueSubject = new Subject<number>();
  RValue$ = this.RValueSubject.asObservable();

  private ClearSubject = new Subject<boolean>();
  clear$ = this.ClearSubject.asObservable();

  updateRValue(newValue: number): void {
    this.RValueSubject.next(newValue);
  }

  updateClearValue(newClear: boolean) {
    this.ClearSubject.next(newClear);
  }
}
