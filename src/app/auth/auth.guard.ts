import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {map, take, tap} from "rxjs/operators";
import {Observable} from "rxjs";


export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  let router = inject(Router)
  return inject(AuthService).user.pipe(
    take(1),
    map( user => {
    return !!user;
    }), tap(isAuth => {
      if(!isAuth) {
        router.navigate(['/auth'])
      }
    })
  );
}

