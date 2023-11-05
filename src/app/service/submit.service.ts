import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubmitService {
  private canvasClickSubject = new Subject<void>();
  canvasClicked$ = this.canvasClickSubject.asObservable();

  private xClicked: number;
  private yClicked: number;

  emitCanvasClick() {
    this.canvasClickSubject.next();
  }

  setXOnClick(x: number) {
    this.xClicked = x;
  }

  setYOnClick(y: number) {
    this.yClicked = y;
  }

  getX(): number {
    return this.xClicked;
  }

  getY(): number {
    return this.yClicked;
  }
}
