import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root' 
})
export class ApiHttpService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getVehicleData(sensorId: string) {
    return this.http.get(`${this.apiUrl}/sensors/${sensorId}/vehicles`);
  }
}