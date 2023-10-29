import {Component, OnInit} from '@angular/core';
import {Shot} from "../shot";
import {ShotsService} from "../service/shots.service";

@Component({
  selector: 'app-shots-list',
  templateUrl: './shots-list.component.html',
  styleUrls: ['./shots-list.component.css']
})
export class ShotsListComponent implements OnInit{

  shots: Shot[];

  constructor(private shotsService: ShotsService) {}

  ngOnInit(): void {
    this.getShots();
  }

  private getShots() {
    this.shotsService.getShotsList().subscribe(data => {
      this.shots = data;
    })
  }
}
