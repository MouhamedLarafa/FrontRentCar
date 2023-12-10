import {Component, OnInit} from '@angular/core';
import {LocationService} from "../../service/location.service";
import {Location} from "../../common/location";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit{

  location : Location[] = [];
   locStatBool: boolean = false;
   locStatReject: boolean = false;
  constructor(private locationService: LocationService,private userService:UserService) {
  }
  ngOnInit(): void {
    this.getLocations()
  }

  getLocations() {

    this.locationService.getAllLocations().subscribe(
      data =>{
        this.location = data
      }
    );
  }


  updateStatus(id: number, msg: string) {
    let location = new Location();
    location.id = id;
    location.status = msg;

    this.locationService.updateStatus(location).subscribe(
      data=>{
      }
    )
    if(msg == "Approved"){
      this.locStatBool = true;
    }
    if(msg == "Rejected"){
      this.locStatReject = true;
    }
    window.location.reload();
  }
}
