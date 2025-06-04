import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../../core/services/chat.service';
import { Router } from '@angular/router';
import { InvitacionService } from '../../../../core/services/invitacion.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ver-anuncio-jugador-publico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ver-anuncio-jugador-publico.component.html'
})
export class VerAnuncioJugadorPublicoComponent implements OnInit {
  anuncio: any;
  id!: number;
  equipoSeleccionadoId: number | null = null;
  invitacionPendiente: boolean = false;
  invitacionId: number | null = null;
  equiposUsuario: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private chatService: ChatService,
    private router: Router,
    private invitacionService: InvitacionService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.route.queryParams.subscribe(params => {
      this.equipoSeleccionadoId = params['equipoId'] ? +params['equipoId'] : null;
    });
    this.http.get<any>(`http://localhost:8000/api/anuncios-jugador/${this.id}/`).subscribe({
      next: (data: any) => {
        this.anuncio = data;
        this.obtenerEquiposUsuario();
      },
      error: (err: any) => {
        console.error('Error al cargar el anuncio:', err);
      }
    });
  }

  obtenerEquiposUsuario() {
    const token = localStorage.getItem('access');
    const headers = { Authorization: `Bearer ${token}` };
    this.http.get<any[]>('http://localhost:8000/api/mis-equipos-creados/', { headers }).subscribe({
      next: (equipos) => {
        this.equiposUsuario = equipos;
        // Si no hay equipo seleccionado, selecciona el primero
        if (!this.equipoSeleccionadoId && equipos.length > 0) {
          this.equipoSeleccionadoId = equipos[0].id;
        }
        this.comprobarInvitacionExistente();
      },
      error: (err) => {
        this.equiposUsuario = [];
        this.comprobarInvitacionExistente();
      }
    });
  }

  onEquipoSeleccionadoChange() {
    this.comprobarInvitacionExistente();
  }

  comprobarInvitacionExistente() {
    if (!this.equipoSeleccionadoId || !this.anuncio?.jugador?.id) return;
    this.http.get<any[]>(`http://localhost:8000/api/invitaciones/?equipo=${this.equipoSeleccionadoId}&jugador=${this.anuncio.jugador.id}`).subscribe({
      next: (invitaciones) => {
        console.log('Equipo seleccionado:', this.equipoSeleccionadoId, 'Jugador:', this.anuncio.jugador.id);
        console.log('Invitaciones recibidas:', invitaciones);
        const invitacion = invitaciones.find(inv => inv.estado === 'pendiente' || inv.estado === 'aceptada');
        console.log('¿Hay invitación pendiente o aceptada para este equipo?', !!invitacion);
        this.invitacionPendiente = !!invitacion;
        this.invitacionId = invitacion ? invitacion.id : null;
      },
      error: (err) => {
        this.invitacionPendiente = false;
        this.invitacionId = null;
      }
    });
  }

  mandarMensaje() {
    if (!this.equipoSeleccionadoId) {
      alert('Selecciona un equipo primero');
      return;
    }
    const jugadorId = this.anuncio.jugador.id;
    this.chatService.iniciarChatConJugador(jugadorId, this.equipoSeleccionadoId).subscribe({
      next: (res: any) => {
        // Redirige al chat
        const chatId = res.chat_id;
        this.router.navigate(['/chat', chatId]);
      },
      error: (err: any) => {
        console.error('Error al iniciar chat', err);
      }
    });
  }

  enviarInvitacion() {
    if (!this.equipoSeleccionadoId) {
      alert('Selecciona un equipo primero');
      return;
    }
    const jugadorId = this.anuncio.jugador.id;
    this.invitacionService.enviarInvitacion(this.equipoSeleccionadoId, jugadorId).subscribe({
      next: () => {
        alert('Invitación enviada');
        this.invitacionPendiente = true;
        this.comprobarInvitacionExistente();
      },
      error: (err) => {
        if (err.status === 400 && err.error && err.error.detail) {
          alert(err.error.detail);
        } else {
          alert('Error al enviar invitación');
        }
      }
    });
  }
}
