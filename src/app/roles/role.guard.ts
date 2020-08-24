import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "../authentication.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
  constructor(
    public authenticationService: AuthenticationService,
    public router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const expectedRole: string[] = next.data.expectedRole;
    return this.authenticationService.getUserRol().pipe(
      map((role) => {
        if (!role || !expectedRole.includes(role)) {
          this.router.navigateByUrl("/home/unauthorized");
          return false;
        }

        return true;
      })
    );
  }
}
