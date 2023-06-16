import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { IParameters } from "../../interfaces/parameters.interface";
import { IClient } from "../../interfaces/client.interface";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public client!: IClient
  constructor() { }

  setClient(client: IClient): void {
    this.client = client
  }
  getClient(): IClient {
    return this.client
  }

}

