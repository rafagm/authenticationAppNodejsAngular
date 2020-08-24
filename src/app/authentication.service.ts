import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import * as jwt_decode from "jwt-decode";
import { map, take, finalize } from "rxjs/operators";
import { BehaviorSubject, from, of } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { AuthenticationErrorDialogComponent } from "./login/authentication-error-dialog/authentication-error-dialog.component";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private user = new BehaviorSubject<User>(null);
  public logging = false; //For spinners purpose

  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {}

  login(email: string, password: string) {
    this.logging = true;
    this.http
      .post(environment.API_URI + "/login", {
        email,
        password,
      })
      .pipe(
        map((response: any) => response.token),
        finalize(() => {
          this.logging = false;
        })
      )
      .subscribe(
        (token) => {
          const jwtDecoded = jwt_decode(token);
          this.setUserData(jwtDecoded);
          this.router.navigateByUrl("/home");
        },
        (error) => {
          this.dialog.open(AuthenticationErrorDialogComponent, {
            data: {
              error: error.error.error,
            },
          });
        }
      );
  }

  setUserData(userData) {
    const user = new User(
      userData.id,
      userData.email,
      userData.name,
      userData.rol,
      userData.exp
    );

    this.user.next(user);

    localStorage.setItem("user", JSON.stringify(user));
  }

  signUp(user) {
    this.logging = true;
    this.http
      .post(environment.API_URI + "/register", {
        name: user.name,
        email: user.email,
        password: user.password,
        rol: user.role,
      })
      .pipe(finalize(() => (this.logging = false)))
      .subscribe(
        (reponse) => {
          this.login(user.email, user.password);
        },
        (error) => {
          this.dialog.open(AuthenticationErrorDialogComponent, {
            data: {
              error: error.error.error,
            },
          });
        }
      );
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem("user");
    this.router.navigateByUrl("/login");
  }

  userIsAuthenticated() {
    return this.user.asObservable().pipe(
      map((user) => {
        if (user) return user.tokenIsValid();
        else return false;
      })
    );
  }

  autoLogin() {
    const tempUser = JSON.parse(localStorage.getItem("user"));

    if (tempUser) {
      const user: User = new User(
        tempUser.id,
        tempUser.email,
        tempUser.name,
        tempUser.rol,
        tempUser.tokenExpirationDate
      );
      return of(user).pipe(
        map((storedUser) => {
          if (!storedUser) return false;

          this.user.next(user);

          if (!user.tokenIsValid()) {
            this.user.next(null);
            localStorage.removeItem("user");
          }

          return user.tokenIsValid();
        })
      );
    } else return of(false);
  }

  getUser() {
    return this.user.asObservable();
  }

  getUserId() {
    return this.user.asObservable().pipe(
      map((user: User) => {
        if (user) return user.id;
        return null;
      })
    );
  }

  getUserEmail() {
    return this.user.asObservable().pipe(
      take(1),
      map((user: User) => {
        if (user) return user.email;
        return null;
      })
    );
  }

  getUserName() {
    return this.user.asObservable().pipe(
      map((user: User) => {
        if (user) return user.name;
        return null;
      })
    );
  }

  getUserRol() {
    return this.user.asObservable().pipe(
      map((user: User) => {
        if (user) return user.rol;
        return null;
      })
    );
  }
}
