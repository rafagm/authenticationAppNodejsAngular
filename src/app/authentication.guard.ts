import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthenticationService } from "./authentication.service";
import { take, flatMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.userIsAuthenticated().pipe(
      take(1),
      flatMap((isAuthenticated) => {
        if (!isAuthenticated) return this.authService.autoLogin();
        else return of(isAuthenticated);
      }),
      tap((isAuthenticated) => {
        if (!isAuthenticated) this.router.navigateByUrl("/login");
      })
    );
  }
}
