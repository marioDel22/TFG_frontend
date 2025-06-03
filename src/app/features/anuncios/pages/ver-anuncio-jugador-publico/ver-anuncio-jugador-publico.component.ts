import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../../core/services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-anuncio-jugador-publico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-anuncio-jugador-publico.component.html'
})
export class VerAnuncioJugadorPublicoComponent implements OnInit {
  anuncio: any;
  id!: number;
  equipoSeleccionadoId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private chatService: ChatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.route.queryParams.subscribe(params => {
      this.equipoSeleccionadoId = params['equipoId'] ? +params['equipoId'] : null;
    });
    this.http.get<any>(`http://localhost:8000/api/anuncios-jugador/${this.id}/`).subscribe({
      next: (data: any) => {
        this.anuncio = data;
      },
      error: (err: any) => {
        console.error('Error al cargar el anuncio:', err);
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
    console.log('Enviar invitación al jugador con ID:', this.anuncio.jugador.id);
    // Aquí irá la lógica real para enviar la invitación
  }
}
