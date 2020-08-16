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

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.getUser().subscribe((user: User) => {
      this.user = user;
    });
  }

  logOut() {
    this.authenticationService.logout();
  }
}
