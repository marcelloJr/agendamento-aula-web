import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import IPageableResponse from 'src/app/interfaces/IPageable';
import { environment } from 'src/environments/environment';

const API = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private httpClient: HttpClient) { }

  getAllSchedules(size: number, page: number, filter = ''): Observable<IPageableResponse> {
    return this.httpClient.get(`${API}/agendamento?size=${size}&page=${page}&filter=${filter}`) as Observable<IPageableResponse>;
  }
}
