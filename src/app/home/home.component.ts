import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../authentication.service";
import { User } from "../user.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  user: User;
  tokenTimeLeft: number;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.getUser().subscribe((user: User) => {
      this.user = user;
    });

    this.setTokenCron();
  }

  setTokenCron() {
    setInterval(() => {
      this.tokenTimeLeft = this.user.tokenExpirationDate*1000 - new Date().getTime()
      console.log(new Date().getTime());

    }, 1000);
  }

  logOut() {
    this.authenticationService.logout();
  }
}
