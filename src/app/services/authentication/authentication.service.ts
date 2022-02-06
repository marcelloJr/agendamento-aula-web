import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import IAuth from '../../interfaces/IAuth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) { }

  auth(body: IAuth): Observable<any> {
    return this.httpClient.post('http://localhost:8080/login', body);
  }
}
