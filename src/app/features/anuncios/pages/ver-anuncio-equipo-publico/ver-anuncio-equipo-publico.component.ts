import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../../core/services/chat.service';

@Component({
  selector: 'app-ver-anuncio-equipo-publico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-anuncio-equipo-publico.component.html'
})
export class VerAnuncioEquipoPublicoComponent implements OnInit {
  anuncio: any;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get<any>(`http://localhost:8000/api/anuncios-equipo/${this.id}/`).subscribe({
      next: (data: any) => {
        this.anuncio = data;
        if (this.anuncio.equipo && typeof this.anuncio.equipo === 'number') {
          this.http.get<any>(`http://localhost:8000/api/equipos/${this.anuncio.equipo}/`).subscribe({
            next: (equipoData) => this.anuncio.equipo = equipoData,
            error: (err) => console.error('Error al obtener equipo', err)
          });
        }
      },
      error: (err: any) => {
        console.error('Error al cargar el anuncio de equipo:', err);
      }
    });
  }

  mandarMensaje() {
    const equipoId = this.anuncio.equipo?.id;
    if (!equipoId) {
      console.error('No se encontró el ID del equipo');
      return;
    }
    const token = localStorage.getItem('access');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<any[]>('http://localhost:8000/api/jugadores/', { headers }).subscribe({
      next: (res) => {
        const jugador = res[0] || null;
        const jugadorId = jugador ? jugador.id : null;
        if (!jugadorId) {
          console.error('No se encontró el ID del jugador');
          return;
        }
        this.chatService.iniciarChatConEquipo(jugadorId, equipoId).subscribe({
          next: (res: any) => {
            this.router.navigate(['/chat', res.chat_id]);
          },
          error: (err: any) => {
            console.error('Error al iniciar chat con el equipo', err);
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener jugador:', err);
      }
    });
  }
}
