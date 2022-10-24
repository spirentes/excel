import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private route: Router,private authService: AuthenticationService)
  {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean>| boolean  {
       const currentUser = this.authService.CurrentUser;
    if(currentUser){
      //check if the route is retricted by role
      if(next.data['roles'] && next.data['roles'].indexOf(currentUser.role) === -1){
        //role not authorized
        this.route.navigate(["/login"])
      
      }
      else{
        return true;
      }
  }
}
}
