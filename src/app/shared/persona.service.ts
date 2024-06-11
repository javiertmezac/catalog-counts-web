import { Injectable, inject } from '@angular/core';
import { Persona } from '../model/persona';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { HandleHttpClientError } from './handle-error';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  url = `${environment.baseUri}/v1/persona`;
  httpClient = inject(HttpClient)
  handleError = inject(HandleHttpClientError)

  update(persona: Persona): Observable<any> {
    if (persona.id === 0 ) {
      throw Error('cannot update persona')
    }
    return this.httpClient.post(`${this.url}/${persona.id}`, persona, {
      headers: {
        'Content-Type' : 'application/json'
      }
    }).pipe(catchError(this.handleError.handleError));
  }
  
  insert(persona: Persona): Observable<any> {
    return this.httpClient.post<Persona>(this.url, persona, {
      headers: {
        'Content-Type' : 'application/json'
      }
    }).pipe(catchError(this.handleError.handleError));
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  emptyPersona(): Persona {
    return {
      id: 0,
      name: '',
      lastname: '',
      status: false,
      registration: ''
    }
  }
}
