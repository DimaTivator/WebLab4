import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthorizationService} from "../service/authorization.service";
import {CustomAlertComponent} from "../custom-alert/custom-alert.component";
import {User} from "../user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authorization-form',
  templateUrl: './authorization-form.component.html',
  styleUrls: ['./authorization-form.component.css']
})
export class AuthorizationFormComponent implements OnInit {
  @ViewChild('alert') customAlert: CustomAlertComponent;

  user: User = new User();

  constructor(private authorizationService: AuthorizationService, private router: Router) {}

  ngOnInit(): void {
    this.authorizationService.showAlert$.subscribe((duration) => {
      this.customAlert.displayAlert(duration);
    });
  }

  authorizeUser(): void {
    if (this.user.username && this.user.password) {
      this.authorizationService.authorize(this.user, this.customAlert)
        .subscribe(
          (response) => {
            localStorage.setItem("username", String(this.user.username));
            localStorage.setItem("token", "token");
            this.router.navigate(['/main']);
          },
          (error) => {
            this.customAlert.displayAlert(5000);
          }
        );
    } else {
      this.customAlert.message = "Enter all data";
      this.customAlert.displayAlert(5000);
    }
  }

  registerUser(): void {
    if (this.user.username && this.user.password) {
      this.authorizationService.register(this.user, this.customAlert)
        .subscribe(
          (response) => {
            localStorage.setItem("username", String(this.user.username));
            localStorage.setItem("token", "token");
            this.router.navigate(['/main']);
          },
          (error) => {
            this.customAlert.displayAlert(5000);
          }
        );
    } else {
      this.customAlert.message = "Enter all data";
      this.customAlert.displayAlert(5000);
    }
  }
}
