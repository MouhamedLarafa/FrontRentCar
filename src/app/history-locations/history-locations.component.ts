import {Component, OnInit} from '@angular/core';
import {LocationService} from "../service/location.service";
import {Location} from "../common/location";

@Component({
  selector: 'app-history-locations',
  templateUrl: './history-locations.component.html',
  styleUrls: ['./history-locations.component.css']
})
export class HistoryLocationsComponent implements OnInit {
  LocationsHistory:Location[] = [];


  constructor(private locationservice:LocationService) {
  }
  getHistory(){
    // @ts-ignore
    this.LocationsHistory=this.locationservice.getlocationsByClient(localStorage.getItem("id")).subscribe(
      data => {
        return this.LocationsHistory = data;
      }
    );
  }

  ngOnInit(): void {
    this.getHistory()
  }
}
