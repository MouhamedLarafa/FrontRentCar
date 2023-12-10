import { Component } from '@angular/core';
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent {
  public usernames:string="";
  constructor(public userService:UserService) {
    // @ts-ignore
    this.usernames=localStorage.getItem("id");
  }
}
