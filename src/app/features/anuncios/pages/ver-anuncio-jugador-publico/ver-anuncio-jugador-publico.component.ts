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

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private chatService: ChatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
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
    // Primero, intenta obtener el equipo del usuario autenticado
    this.http.get<any[]>('http://localhost:8000/api/equipos/').subscribe({
      next: (equipos: any[]) => {
        let equipoId = null;
        if (equipos.length > 0) {
          equipoId = equipos[0].id; // Si el usuario es un equipo, coge el primer equipo
        }
        const jugadorId = this.anuncio.jugador.id;

        this.chatService.iniciarChatConJugador(jugadorId, equipoId).subscribe({
          next: (res: any) => {
            // Redirige al chat
            const chatId = res.chat_id;
            this.router.navigate(['/chat', chatId]);
          },
          error: (err: any) => {
            console.error('Error al iniciar chat', err);
          }
        });
      },
      error: (err: any) => {
        // Si no es equipo, intenta como jugador
        this.http.get<any[]>('http://localhost:8000/api/jugadores/').subscribe({
          next: (jugadores: any[]) => {
            let jugadorId = null;
            if (jugadores.length > 0) {
              jugadorId = jugadores[0].id;
            }
            const equipoId = this.anuncio.equipo?.id || null;

            this.chatService.iniciarChatConJugador(jugadorId, equipoId).subscribe({
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
        });
      }
    });
  }

  enviarInvitacion() {
    console.log('Enviar invitación al jugador con ID:', this.anuncio.jugador.id);
    // Aquí irá la lógica real para enviar la invitación
  }
}
