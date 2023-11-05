import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Shot} from "../shot";
import {ShotsService} from "../service/shots.service";
import {ShotsListComponent} from "../shots-list/shots-list.component";
import {CustomAlertComponent} from "../custom-alert/custom-alert.component";
import {RValueService} from "../service/rvalue.service";
import {SubmitService} from "../service/submit.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @ViewChild('alert') customAlert: CustomAlertComponent;

  @ViewChildren('x-button') xButtons: QueryList<ElementRef>;

  shot: Shot = new Shot();

  x: number;
  y: number;
  r: number;

  private xValues = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];

  constructor(private shotsService: ShotsService,
              private rValueService: RValueService,
              private submitService: SubmitService) {}

  ngOnInit(): void {
    this.shotsService.showAlert$.subscribe((duration) => {
      this.customAlert.displayAlert(duration);
    });

    this.submitService.canvasClicked$.subscribe(() => {
      this.processDataFromCanvas(this.submitService.getX(), this.submitService.getY());
    });
  }

  saveShot(): void {
    this.shotsService.createShot(this.shot, this.customAlert).subscribe(data => {
      console.log(data);
    },
    error => {
      console.log("error");
    });
  }

  onSubmit(): void {
    this.saveShot();
  }

  clearTable(): void {
    this.shotsService.deleteAllShots().subscribe(data => {
        console.log(data);
      },
      error => {
        console.log("error");
      });
  }

  setX(x: number): void {
    this.x = x;
    this.shot.xvalue = x;
  }

  setY(y: number): void {
    this.y = y;
    this.shot.yvalue = y;
  }

  setR(r: number): void {
    this.r = r;
    this.shot.rvalue = r;
    if (r > 0) {
      this.rValueService.updateRValue(r);
    }
  }

  processDataFromCanvas(x: number, y: number): void {
    // round x
    let newX = 0;
    for (let i = 0; i < this.xValues.length; i++) {
      if (Math.abs(this.xValues[i] - x) < Math.abs(this.xValues[i] - newX)) {
        newX = this.xValues[i];
      }
    }
    this.setX(newX);
    this.setY(+y.toFixed(3));

    this.saveShot();
  }
}
