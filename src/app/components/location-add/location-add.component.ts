import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {LocationService} from "../../service/location.service";
import {Car} from "../../common/car";
import {CarService} from "../../service/car.service";
import {Location} from "../../common/location";
import {User} from "../../common/User";




@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.css']
})
export class LocationAddComponent {
  locationFormGroup!: FormGroup;
  user !: User;
  locationSucc: boolean = false;
  locationErr: boolean = false;

  idcar!: number;
  car!: Car;

  constructor(private formBuilder: FormBuilder,
              private locationService: LocationService,
              private carService: CarService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.getCarInformations();
    this.formGroupInit();
    // this.calulatePrice();

  }


  formGroupInit() {
    this.locationFormGroup = this.formBuilder.group({
      locationInfo: this.formBuilder.group({
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl('', [Validators.required]),
        totalPrice: new FormControl('')
      })
    });
  }

  getDiffrenceDays(): number {
    let d1 = new Date(this.startDate?.value);
    let d2 = new Date(this.endDate?.value);


    let days = Math.floor((d2.getTime() - d1.getTime()) / 1000 / 60 / 60 / 24);
    return days+1;
  }

  calulatePrice() {
    let result = (this.car.dayPrice * this.getDiffrenceDays()).toFixed(2);
    this.totalPrice?.setValue(result.valueOf() + " DT");
  }

  getCarInformations() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.idcar = +this.route.snapshot.paramMap.get('id')!;
      this.carService.getOneCar(this.idcar).subscribe(
        data => {
          this.car = data;
        }
      );
    }
  }

  get startDate() {
    return this.locationFormGroup.get('locationInfo.startDate')
  }

  get endDate() {
    return this.locationFormGroup.get('locationInfo.endDate')
  }

  get totalPrice() {
    return this.locationFormGroup.get('locationInfo.totalPrice')
  }


  onSubmit() {


    if(this.locationFormGroup.invalid){
      this.locationFormGroup.markAllAsTouched();
      return;
    }


    let user = new User();
    user.username = JSON.parse(JSON.stringify(localStorage.getItem("id")));


    let location  = new Location();

    location.startDate = this.startDate?.value;
    location.endDate = this.endDate?.value;
    location.user = user;
    location.car = this.car;

    if(location.startDate > location.endDate){
      this.locationErr = true;
      return;
    }

    this.locationService.addNewLocation(location).subscribe({
      next:response=>{
        this.locationSucc = true;
        // alert("location added "+response.price);
      }, error: err => {
            alert("There was an error: "+err.message());
          }
    });
  }

}
