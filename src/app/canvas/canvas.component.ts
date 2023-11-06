import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RValueService} from "../service/rvalue.service";
import {SubmitService} from "../service/submit.service";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('graph') canvas: ElementRef<HTMLCanvasElement>;
  private context: CanvasRenderingContext2D;

  private height = 380;
  private width = 380;
  private R = 40;

  private chartColor = "#ADD8E6"

  pointsMap: Map<number, Array<{ x: number, y: number }>> = new Map<number, Array<{ x: number, y: number }>>();


  constructor(private rValueService: RValueService, private submitService: SubmitService) {
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    this.context = this.canvas.nativeElement.getContext('2d');


    this.draw();

    this.initializePointsMap();

    this.rValueService.RValue$.subscribe((newValue: number) => {
      this.R = 40 * newValue;
      this.clear();
      this.draw();
      this.drawPointsByR();
    });

    this.rValueService.clear$.subscribe(() => {
      this.removePoints();
      this.clear();
      this.draw();
      this.drawPointsByR();
    });

    this.canvas.nativeElement.addEventListener('click', (event: MouseEvent) => {
      this.handleCanvasClick(event);
    });
  }


  removePoints(): void {
    console.log("remove points");
    this.pointsMap.forEach((array, key) => {
      this.pointsMap.set(key, []);
    });
  }


  initializePointsMap(): void {
    for (let i = 20; i <= 80; i += 20) {
      this.pointsMap.set(i, []);
    }
  }

  savePointToMap(x: number, y: number): void {
    if (this.pointsMap.has(this.R)) {
      this.pointsMap.get(this.R)!.push({ x, y });
    }
  }

  drawPointsByR(): void {
    this.clear();
    this.draw();

    if (this.pointsMap.has(this.R)) {
      this.pointsMap.get(this.R)!.forEach((point) => {
        let pointColor = ((this.checkHit(this.toCartesian(point.x, point.y))) ? 'green' : 'red')
        this.drawPoint(point.x, point.y, 5, pointColor);
      });
    }
  }

  handleCanvasClick(event: MouseEvent): void {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    let cartesianPoint = this.toCartesian(x, y);

    this.savePointToMap(x, y);
    this.drawPointsByR();

    this.submitService.setXOnClick(cartesianPoint[0] / this.R);
    this.submitService.setYOnClick(cartesianPoint[1] / this.R);
    this.submitService.emitCanvasClick();
  }


  draw(): void {
    this.context.lineWidth = 2;
    this.context.font = "10px monospace";

    let deltaY = 6;
    let deltaX = 10;

    // chart
    this.drawChart();

    this.drawAxes();

    // x text
    this.context.fillText('R/2', this.width / 2 + this.R, this.height / 2 - deltaY);
    this.context.fillText('R', this.width / 2 + this.R * 2, this.height / 2 - deltaY);

    this.context.fillText('-R/2', this.width / 2 - this.R - deltaX, this.height / 2 - deltaY);
    this.context.fillText('-R', this.width / 2 - this.R * 2 - deltaX, this.height / 2 - deltaY);

    // y text
    this.context.fillText('R/2', this.width / 2 + deltaX, this.height / 2 - this.R);
    this.context.fillText('R', this.width / 2 + deltaX, this.height / 2 - this.R * 2);

    this.context.fillText('-R/2', this.width / 2 + deltaX, this.height / 2 + this.R);
    this.context.fillText('-R', this.width / 2 + deltaX, this.height / 2 + this.R * 2);

    // points
    this.drawPoint(this.width / 2, this.height / 2, 3, 'black');
    this.drawPoint(this.width / 2 - this.R, this.height / 2, 3, 'black');
    this.drawPoint(this.width / 2 - this.R * 2, this.height / 2, 3, 'black');
    this.drawPoint(this.width / 2 + this.R, this.height / 2, 3, 'black');
    this.drawPoint(this.width / 2 + this.R * 2, this.height / 2, 3, 'black');
    this.drawPoint(this.width / 2, this.height / 2 - this.R, 3, 'black');
    this.drawPoint(this.width / 2, this.height / 2 - this.R * 2, 3, 'black');
    this.drawPoint(this.width / 2, this.height / 2 + this.R, 3, 'black');
    this.drawPoint(this.width / 2, this.height / 2 + this.R * 2, 3, 'black');
  }


  drawAxes(): void {
    this.context.lineWidth = 2;
    this.context.font = "10px monospace";

    let deltaY = 6;
    let deltaX = 10;

    this.context.fillStyle = 'black'
    this.context.strokeStyle = 'black'

    // x axis
    this.context.beginPath();
    this.context.moveTo(0, this.height / 2);
    this.context.lineTo(this.width, this.height / 2);
    this.context.stroke();
    this.context.closePath();

    // y axis
    this.context.beginPath();
    this.context.moveTo(this.width / 2, 0);
    this.context.lineTo(this.width / 2, this.height);
    this.context.stroke();
    this.context.closePath();

    // y arrow
    let length = 7;
    this.context.beginPath();
    this.context.moveTo(this.width / 2 - length, length);
    this.context.lineTo(this.width / 2, 0);
    this.context.lineTo(this.width / 2 + length, length);
    this.context.fill();
    this.context.closePath();

    // x arrow
    this.context.beginPath();
    this.context.moveTo(this.width - length, this.height / 2 - length);
    this.context.lineTo(this.width - length, this.height / 2 + length);
    this.context.lineTo(this.width, this.height / 2);
    this.context.fill();
    this.context.closePath();
  }

  drawPoint(x: number, y: number, R: number, color: string): void {
    this.context.beginPath()
    this.context.moveTo(x, y)
    this.context.arc(x, y, R, 0, Math.PI * 2)
    this.context.fillStyle = color
    this.context.fill()
    this.context.closePath()
  }


  drawChart(): void {
    this.context.fillStyle = this.chartColor;

    // rectangle
    this.context.fillRect(this.width / 2, this.height / 2, -this.R, 2 * this.R);

    //triangle
    this.context.beginPath();
    this.context.moveTo(this.width / 2, this.height / 2);
    this.context.lineTo(this.width / 2, this.height / 2 + 2 * this.R);
    this.context.lineTo(this.width / 2 + this.R * 2, this.height / 2);
    this.context.fill();
    this.context.closePath();

    //circle
    this.context.beginPath();
    this.context.moveTo(this.width / 2, this.height / 2);
    this.context.arc(this.width / 2, this.height / 2, 2 * this.R, Math.PI, 3 * Math.PI / 2);
    this.context.fill();
    this.context.closePath();

  }


  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.draw();
  }


  toCartesian(x: number, y: number): number[] {
    return [x - this.width / 2, this.height / 2 - y];
  }

  checkTriangle(x: number, y: number): boolean {
    return x >= 0 && y <= 0 && x - y <= 2 * this.R;
  }

  checkRectangle(x: number, y: number): boolean {
    return x <= 0 && y <= 0 && Math.abs(x) <= this.R && Math.abs(y) <= 2 * this.R;
  }

  checkCircle(x: number, y: number): boolean {
    return x <= 0 && y >= 0 && x * x + y * y <= 4 * this.R * this.R;
  }

  checkHit(c: number[]): boolean {
    let x = c[0], y = c[1];
    return this.checkCircle(x, y) || this.checkTriangle(x, y) || this.checkRectangle(x, y);
  }
}

