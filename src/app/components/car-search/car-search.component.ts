import {Component, OnInit} from '@angular/core';
import {CarService} from "../../service/car.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-car-search',
  templateUrl: './car-search.component.html',
  styleUrls: ['./car-search.component.css']
})
export class CarSearchComponent implements OnInit{




  constructor(private carService:CarService,
              private route: Router,
              ) {
  }

  public ngOnInit() {

  }
  searchByBrand(theBrand:string){
    this.route.navigateByUrl("search/"+theBrand);
  }
}
