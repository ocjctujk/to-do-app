import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { SignUpService } from './sign-up.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private signUpService: SignUpService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | UrlTree | Promise<boolean> | Observable<boolean | UrlTree>{
    return this.signUpService.user.pipe(
        take(1),
      map((user) => {
        const isAuth = !!user.email;
        if (isAuth) {
            console.log(isAuth);
            console.log(user);
          return isAuth;
        } else {
          return this.router.createUrlTree(['']);
        }
      })
    );
  }
}
