import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { Car } from 'src/app/common/car';
import { CarService } from 'src/app/service/car.service';
import { UserAuthService } from 'src/app/service/user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  searchFormGroup!: FormGroup;
  cars : Car[] = [];
  

  constructor(private formBuilder: FormBuilder, private carService:CarService, public auth:UserAuthService) {
  }

  ngOnInit(): void {
    this.carService.getAllCarsss().subscribe(
      data=>{
        for (let index = 0; index < data.length; index++) {
          console.log(data[index].id)            
        }
        this.cars = data;
      }
      
    )
    
    
  }

  


}
