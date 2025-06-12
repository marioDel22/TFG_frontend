import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InvitacionService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  enviarInvitacion(equipoId: number, jugadorId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/invitaciones/`, {
      equipo: equipoId,
      jugador: jugadorId
    });
  }

  getInvitacionesJugador(jugadorId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/invitaciones/?jugador=${jugadorId}`);
  }

  actualizarInvitacion(invitacionId: number, estado: 'aceptada' | 'rechazada') {
    return this.http.patch(`${this.apiUrl}/invitaciones/${invitacionId}/`, { estado });
  }
} 