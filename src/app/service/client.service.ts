import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Client} from "../common/client";
import {map, Observable} from "rxjs";
import {Car} from "../common/car";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clientApiUrl = 'http://localhost:8080/api/clients';
  constructor(private httpClient : HttpClient) { }

  addNewClient(client: Client){
    return this.httpClient.post(this.clientApiUrl,client);
  }

  getClientByEmail(email:string): Observable<Client>{
    const clientEmailUrl = this.clientApiUrl+'/search/findClientByEmail?email='+email;
    return this.httpClient.get<Client>(clientEmailUrl);
  }

  private getClients(searchUrl:string){
    return this.httpClient.get<GetClientsResponse>(searchUrl).pipe(
      map(response => response._embedded.clients)
    );
  }
}



interface GetClientsResponse
{
  _embedded:{
    clients: Client[];
  }
}
