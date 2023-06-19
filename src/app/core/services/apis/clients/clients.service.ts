import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONFIG } from 'src/app/core/config/config';
import { ApisUrlEnums } from 'src/app/core/enums/apis-url.enums';
import { IClient } from 'src/app/core/interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private server = CONFIG.SERVER;
  private api = ApisUrlEnums.USERS
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<IClient[]> {
    const url = `${this.server}${this.api}`
    return this.httpClient.get<IClient[]>(url)
  }
  getById(id: number): Observable<IClient[]> {
    const url = `${this.server}${this.api}/${id}`
    return this.httpClient.get<IClient[]>(url)
  }
  create(data: IClient): Observable<IClient> {
    const url = `${this.server}${this.api}/`
    return this.httpClient.post<IClient>(url, data)
  }
  update(id: number, data: IClient): Observable<IClient> {
    const url = `${this.server}${this.api}/${id}`
    return this.httpClient.put<IClient>(url, data)
  }
  delete(id: number): Observable<any> {
    const url = `${id}`
    return this.httpClient.delete<IClient>(url)
  }
}
