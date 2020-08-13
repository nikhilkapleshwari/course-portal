import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  private isAdminFlag:boolean;
  private isLoggedInFlag:boolean;

  constructor(private apiService: ApiService) { }

  isAdmin(){
    return this.isAdminFlag;
  }

  isLoggedIn(){
    return this.isLoggedInFlag;
  }

  setIsAdminFlag(flag:boolean){
    this.isAdminFlag=flag;
    this.setIsLoggedInFlag(flag);
  }

  setIsLoggedInFlag(flag:boolean){
    this.isLoggedInFlag=flag;
  }

}
