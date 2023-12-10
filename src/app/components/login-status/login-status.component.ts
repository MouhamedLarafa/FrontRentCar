import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserAuthService} from "../../service/user-auth.service";
import {UserService} from "../../service/user.service";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {
public id:String="";
public isauthenticated!:boolean;
  constructor(
    public userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,

  ) {
    if (localStorage.getItem("id")!=null){
      this.isauthenticated=true;
    }
  }
  getuserId(){
    return this.id=this.userAuthService.getId();
  }

  ngOnInit(): void {}

  public isLoggedIn() {
     return this.userAuthService.isLoggedIn();
  }


  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/login']);
  }

}
