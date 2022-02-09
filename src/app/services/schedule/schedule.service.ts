import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import IPageableResponse from 'src/app/interfaces/IPageable';
import ISchedule, { IScheduleGetById, IScheduleUpdate } from 'src/app/interfaces/ISchedule';
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

  getTeachers(): Observable<IPageableResponse> {
    return this.httpClient.get(`${API}/professor?size=999`) as Observable<IPageableResponse>;
  }

  regiterSchedule(newSchedule: ISchedule) {
    return this.httpClient.post(`${API}/agendamento`, newSchedule);
  }

  updateSchedule(id: number, newSchedule: IScheduleUpdate) {
    return this.httpClient.patch(`${API}/agendamento/${id}`, newSchedule);
  }

  getById(id: number): Observable<IScheduleGetById> {
    return this.httpClient.get(`${API}/agendamento/${id}`) as Observable<IScheduleGetById>;
  }
}
