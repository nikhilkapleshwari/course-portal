import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserLoginService } from './user-login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  title: string;
  message: string;

  constructor(private userLoginService:UserLoginService,private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    
    //console.log('Expected role:'+route.data.expectedRole);
    if(!this.userLoginService.isAdmin()){
      this.router.navigate(['/home']);
    }
    return this.userLoginService.isAdmin();
  }

  
}
