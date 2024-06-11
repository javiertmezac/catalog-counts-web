import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimezoneTypesService {

  private baseUri = environment.baseUri;
  private path = `${this.baseUri}/v1/timezone`;

  constructor(private httpClient: HttpClient) { }

  getTimeZones():Observable<any> {
    return this.httpClient.get(this.path);
  }
}
