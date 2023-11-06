import {Component, OnDestroy} from '@angular/core';
import {AuthorizationService} from "../service/authorization.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnDestroy {

  constructor(private authService: AuthorizationService) { }

  ngOnDestroy(): void {
    this.authService.clearToken();
  }

}
