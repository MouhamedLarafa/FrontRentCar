import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Location} from "../common/location";
import {Car} from "../common/car";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private locationApiUrl = 'http://localhost:8080/api/locations';
  constructor(private httpClient: HttpClient) { }



  updateStatus(location: Location): Observable<any>{
    return this.httpClient.patch<Location>("http://localhost:8080/api/location/updatestatus",location);
  }
  addNewLocation(location : Location) : Observable<any>{
    return this.httpClient.post<Location>("http://localhost:8080/api/location/addLocation",location);
  }

  getAllLocations():Observable<Location[]>{
    return this.httpClient.get<any>("http://localhost:8080/api/location/allLocations");
  }
  getlocationsByClient(id:string):Observable<Location[]>{
    return this.httpClient.get<any>("http://localhost:8080/api/location/UserLocations/"+id);
  }


  getLocation(searchUrl:string){
    return this.httpClient.get<GetLocations>(searchUrl).pipe(
      map(response => response._embedded.locations)
    );
  }
}

interface GetLocations
{
  _embedded:{
    locations: Location[];
  }
}
