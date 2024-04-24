import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {BehaviorSubject, pipe} from "rxjs";
import {exhaustMap, take} from "rxjs/operators";
import {User} from "./user.model";

@Injectable()//we cannot do providedIn root here because angular won't understand it with http stuff(dont remember specifics honestly)
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if(!user){ //we could also write logic to exclude based on url but user works here
          return next.handle(req)
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        })
        return next.handle(modifiedReq)
      })
    )
  }
}
