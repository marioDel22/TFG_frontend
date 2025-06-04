import { Component, OnInit } from '@angular/core';
import { InvitacionService } from '../../../core/services/invitacion.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invitaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invitaciones.component.html'
})
export class InvitacionesComponent implements OnInit {
  invitaciones: any[] = [];
  cargando = true;
  miJugadorId: number | null = null;

  constructor(private invitacionService: InvitacionService, private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('access');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Obtener el jugador del usuario autenticado
    this.http.get<any[]>('http://localhost:8000/api/jugadores/', { headers }).subscribe({
      next: (res) => {
        const jugador = res[0] || null;
        this.miJugadorId = jugador ? jugador.id : null;
        if (this.miJugadorId) {
          this.cargarInvitaciones();
        } else {
          this.cargando = false;
        }
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  cargarInvitaciones() {
    if (!this.miJugadorId) return;
    this.invitacionService.getInvitacionesJugador(this.miJugadorId).subscribe({
      next: (res: any[]) => {
        console.log('Respuesta de invitaciones:', res);
        res.forEach(inv => console.log('Estado:', inv.estado, 'Invitación:', inv));
        this.invitaciones = res.filter((inv: any) => inv.estado === 'pendiente');
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  aceptarInvitacion(invId: number) {
    this.invitacionService.actualizarInvitacion(invId, 'aceptada').subscribe({
      next: () => this.cargarInvitaciones(),
      error: () => alert('Error al aceptar la invitación')
    });
  }

  rechazarInvitacion(invId: number) {
    this.invitacionService.actualizarInvitacion(invId, 'rechazada').subscribe({
      next: () => this.cargarInvitaciones(),
      error: () => alert('Error al rechazar la invitación')
    });
  }
} 