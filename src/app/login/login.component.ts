import { Component, OnInit } from "@angular/core";

import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormBuilder,
} from "@angular/forms";
import { AuthenticationService } from "../authentication.service";
import { flatMap, take, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginPage = true;

  emailErrorMessage = "Error with the email";
  passwordErrorMessage = "Error with the password";

  loginForm: FormGroup;
  signupForm: FormGroup;

  roles: string[] = ["consumer", "moderator", "administrator"];

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.redirectIfUserAuthenticated().subscribe();
  }

  ngOnInit() {
    this.createForms();
    this.switchLoginSignup();
  }

  createForms() {
    this.createLoginForm();
    this.createSignupForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });
  }

  createSignupForm() {
    this.signupForm = this.fb.group({
      name: [
        "",
        {
          validators: [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(255),
          ],
          updateOn: "blur",
        },
      ],
      email: [
        "",
        {
          validators: [
            Validators.required,
            Validators.email,
            Validators.minLength(6),
            Validators.maxLength(255),
          ],
          updateOn: "blur",
        },
      ],
      password: [
        "",
        {
          validators: [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(1024),
          ],
          updateOn: "blur",
        },
      ],
      rol: [
        "consumer",
        {
          validators: [Validators.required, Validators.maxLength(255)],
          updateOn: "blur",
        },
      ],
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
        if (isAuthenticated) this.router.navigateByUrl("/home");
      })
    );
  }

  switchLoginSignup() {
    this.loginPage = !this.loginPage;
    this.changeFooterColor();
  }

  changeFooterColor() {
    const footer: any = document.getElementsByClassName('footer')[0];

    if (this.loginPage) {
      footer.style.backgroundColor = `#8292A1`;
    } else {
      footer.style.backgroundColor = `#EDE1A8`;
    }
  }
}
