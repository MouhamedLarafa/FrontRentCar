import {Component, OnInit} from '@angular/core';
import {Car} from "../../common/car";
import {CarService} from "../../service/car.service";
import {ActivatedRoute} from "@angular/router";
import {filter, map, Observable} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";


@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cars : Car[] = [];
  searchModeId!: boolean;
  searchModeBrand!: boolean;
  displayStyle = "none";
  carIdToDelete : number = 0;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  searchFormGroup!: FormGroup;
   dateErr: boolean = false;


  constructor(private carService:CarService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              public userService:UserService) {
  }
  ngOnInit(): void {
    this.formGroupInit();
    this.route.paramMap.subscribe(
      ()=>{
        this.listCars();
      }
    );
  }

  onSubmit() {

    if(this.startDate?.value>this.endDate?.value){
      alert("enter a valid date please ..")
      return;
    }
    this.carService.getAllCars(this.startDate?.value, this.endDate?.value).subscribe(
      data =>{
        this.cars = data;
      }
    );
  }

  get startDate(){return this.searchFormGroup.get('searchInfo.startDate')}
  get endDate(){return this.searchFormGroup.get('searchInfo.endDate')}
  formGroupInit(){
    this.searchFormGroup = this.formBuilder.group({
      searchInfo : this.formBuilder.group({
        startDate : new FormControl('', [
          Validators.required]),
        endDate : new FormControl('',[
          Validators.required])
      })
    });
  }


  openPopup(id: number) {
    this.carIdToDelete = id;
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  deleteCar(){
    this.carService.deleteCar(this.carIdToDelete).subscribe(
      data=>{
        this.closePopup();
        this.listCars();
      }
    );
  }


  listCars(){
    //we set up the router in app.module with :keyword
    this.searchModeId = this.route.snapshot.paramMap.has("id");
    this.searchModeBrand = this.route.snapshot.paramMap.has("brand");


    if(this.searchModeId) {
      console.log(this.searchModeId);
      this.getCarById();
    }
    else if(this.searchModeBrand) {
      this.getCarByBrand();
    }
    else if(this.startDate?.value !='' && this.endDate?.value !=''){

      this.getAllCars();
    }
    else
    {
      this.carService.getCars("http://localhost:8080/api/cars/").subscribe(
        data=>{
          for (let index = 0; index < data.length; index++) {
            console.log(data[index].id)            
          }
          this.cars = data;
        }
      )
    }

  }

  getAllCars(){
    //it will return json file in that data and we will asign that to our prouducts
    //data is the return value of json file

  }

  getCarById(){
    const carId = +this.route.snapshot.paramMap.get('id')!;
    this.carService.getOneCar(carId).subscribe(
      data=>{
        this.cars[0] = data;
      }
    );
  }


  private getCarByBrand() {
    const brandSearch = this.route.snapshot.paramMap.get('brand')!;

    this.carService.getCarByBrand(brandSearch).subscribe(
      data=>{
        this.cars = data;
      }
    );
  }




  retrivedImage(imageUrl: string) {
    if(imageUrl.indexOf("/src/")!=-1){    return(imageUrl.split("/src/")[1])
    }
    return imageUrl;

  }

}
