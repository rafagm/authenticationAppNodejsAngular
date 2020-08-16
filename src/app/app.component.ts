import { Component } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { AuthenticationService } from "./authentication.service";
import { flatMap, take, tap } from "rxjs/operators";
import { of } from "rxjs";
import { User } from "./user.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Authentication App";

  emailErrorMessage = "Error with the email";
  passwordErrorMessage = "Error with the password";

  user: User;

  loginForm = new FormGroup({
    email: new FormControl(null, {
      updateOn: "blur",
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl(null, {
      updateOn: "blur",
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  constructor(public authenticationService: AuthenticationService) {
    this.redirectIfUserAuthenticated().subscribe();
    this.authenticationService
      .getUser()
      .subscribe((user: User) => {
        console.log("user: ", user);

        this.user = user;
      });
  }

  showEmailError() {
    const emailFormControl: AbstractControl = this.loginForm.get("email");
    const errors = emailFormControl.errors;

    if (errors) this.setEmailErrorMessage(errors);

    return !emailFormControl.valid && emailFormControl.touched;
  }

  setEmailErrorMessage(errors) {
    if (errors.required) {
      this.emailErrorMessage = "Email is required";
    } else if (errors.email) {
      this.emailErrorMessage = "Email must be a valid email address";
    }
  }

  showPasswordError() {
    const passwordFormControl: AbstractControl = this.loginForm.get("password");
    const errors = passwordFormControl.errors;

    if (errors) this.setPasswordErrorMessage(errors);

    return (
      !this.loginForm.get("password").valid &&
      this.loginForm.get("password").touched
    );
  }

  setPasswordErrorMessage(errors) {
    if (errors.required) this.passwordErrorMessage = "Password is required";
    else if (errors.minlength)
      this.passwordErrorMessage =
        "Password must be at least 6 characters long ";
  }

  logIn() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;

    const email = this.loginForm.get("email").value;
    const password = this.loginForm.get("password").value;

    this.authenticationService.login(email, password);
  }

  logOut() {
    this.authenticationService.logout();
  }

  private redirectIfUserAuthenticated() {
    return this.authenticationService.userIsAuthenticated().pipe(
      take(1),
      flatMap((isAuthenticated) => {
        if (!isAuthenticated) return this.authenticationService.autoLogin();
        return of(isAuthenticated);
      }),
      tap((isAuthenticated) => {
        if (isAuthenticated) console.log("you are already logged!!!");
        else {
          console.log("You haven't log in yet");
        }
      })
    );
  }
}
