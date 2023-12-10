import {Component, OnInit} from '@angular/core';
import {Location} from "../../common/location";
import {LocationService} from "../../service/location.service";
import {UserService} from "../../service/user.service";
import {User} from "../../common/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-gestion-users',
  templateUrl: './gestion-users.component.html',
  styleUrls: ['./gestion-users.component.css']
})
export class GestionUsersComponent implements OnInit{

  users : User[] = [];
  userStatBool: boolean = false;
  userStatReject: boolean = false;
  constructor(private userService:UserService,private router:Router) {
  }
  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {

    this.userService.getAllusers().subscribe(
      data =>{
        this.users = data
      }
    );
  }


  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(
      data=>{

    });
  window.location.reload();
  }
}
