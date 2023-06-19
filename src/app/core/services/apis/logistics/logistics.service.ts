import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONFIG } from 'src/app/core/config/config';
import { ApisUrlEnums } from 'src/app/core/enums/apis-url.enums';
import { ILogistics } from 'src/app/core/interfaces/logistic.interface';


@Injectable({
  providedIn: 'root'
})
export class LogisticsService {
  private server = CONFIG.SERVER;
  private api = ApisUrlEnums.LOGISTICTS
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ILogistics[]> {
    const url = `${this.server}${this.api}`
    return this.httpClient.get<ILogistics[]>(url)
  }
  getById(id: number): Observable<ILogistics[]> {
    const url = `${this.server}${this.api}/${id}`
    return this.httpClient.get<ILogistics[]>(url)
  }
  create(data: ILogistics): Observable<ILogistics> {
    const url = `${this.server}${this.api}/`
    return this.httpClient.post<ILogistics>(url, data)
  }
  update(id: number, data: ILogistics): Observable<ILogistics> {
    const url = `${this.server}${this.api}/${id}`
    return this.httpClient.put<ILogistics>(url, data)
  }
  delete(id: number): Observable<any> {
    const url = `${id}`
    return this.httpClient.delete<ILogistics>(url)
  }
}
