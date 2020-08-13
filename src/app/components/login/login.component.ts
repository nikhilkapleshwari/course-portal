import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginService } from 'src/app/shared/user-login.service';
import { ApiService } from 'src/app/shared/api.service';
import { User } from '../../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userLoginService:UserLoginService, private apiService:ApiService, private router:Router) { }

  username: string;
  password: string;

  login() : void {
    let user = new User(this.username,this.password,'admin');
    this.apiService.login(user).subscribe(res=>{
      if(res){
        this.router.navigate(['/home/students-list']);
        this.userLoginService.setIsAdminFlag(true);
      }else{
        alert("Invalid credentials");
        this.userLoginService.setIsAdminFlag(false);
        this.router.navigate(['/home/login']).then(()=>
          window.location.reload());
      }
    });
  }

  logout(): void{
    this.userLoginService.setIsAdminFlag(false);
    this.router.navigate(['']);
  }

  isLoggedIn(){
    return this.userLoginService.isLoggedIn();
  }

  ngOnInit() {
  }

}
