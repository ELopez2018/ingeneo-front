import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONFIG } from 'src/app/core/config/config';
import { ApisUrlEnums } from 'src/app/core/enums/apis-url.enums';
import { ITransportType } from 'src/app/core/interfaces/Transport-type.interface';


@Injectable({
  providedIn: 'root'
})
export class TransportTypeService {

  private server = CONFIG.SERVER;
  private api = ApisUrlEnums.TRANSPORT
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ITransportType[]> {
    const url = `${this.server}${this.api}`
    return this.httpClient.get<ITransportType[]>(url)
  }
  getById(id: number): Observable<ITransportType[]> {
    const url = `${this.server}${this.api}/${id}`
    return this.httpClient.get<ITransportType[]>(url)
  }
  create(data: ITransportType): Observable<ITransportType> {
    const url = `${this.server}${this.api}/`
    return this.httpClient.post<ITransportType>(url, data)
  }
  update(id: number, data: ITransportType): Observable<ITransportType> {
    const url = `${this.server}${this.api}/${id}`
    return this.httpClient.put<ITransportType>(url, data)
  }
  delete(id: number): Observable<any> {
    const url = `${id}`
    return this.httpClient.delete<ITransportType>(url)
  }
}
