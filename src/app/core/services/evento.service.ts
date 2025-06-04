import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventoService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getEventosEquipo(equipoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/eventos-calendario/?equipo=${equipoId}`);
  }

  crearEvento(evento: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/eventos-calendario/`, evento);
  }
} 