import { CanActivate, Router,ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from '../public/login/login.service'
import { Observable } from 'rxjs';



@Injectable()
export class AuthService implements CanActivate {
  constructor(
    public authService: LoginService,
    public router: Router
  ){ }


  canActivate(): boolean | UrlTree {
   
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
console.log(this.router.url)
    if (token && user) {
        
      return true;
    } else {
      return this.router.parseUrl("/public/login");
      //return true;
    }
  }
}

