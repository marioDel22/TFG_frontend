import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChatService } from '../../../../core/services/chat.service';

@Component({
  selector: 'app-ver-anuncio-equipo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ver-anuncio-equipo.component.html'
})
export class VerAnuncioEquipoComponent implements OnInit {
  anuncio: any = null;
  anuncioId!: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.anuncioId = this.route.snapshot.paramMap.get('id')!;
    this.http.get(`http://localhost:8000/api/anuncios-equipo/${this.anuncioId}/`).subscribe({
      next: (res) => this.anuncio = res,
      error: (err) => console.error('Error al cargar anuncio de equipo:', err)
    });
  }

  editarAnuncio() {
    this.router.navigate(['/anuncio-equipo/editar', this.anuncioId]);
  }

  eliminarAnuncio() {
    if (confirm('¿Estás seguro de que quieres eliminar el anuncio?')) {
      this.http.delete(`http://localhost:8000/api/anuncios-equipo/${this.anuncioId}/`).subscribe({
        next: () => this.router.navigate(['/inicio']),
        error: (err) => console.error('Error al eliminar anuncio de equipo', err)
      });
    }
  }

  abrirChat() {
    const equipoId = this.anuncio.equipo?.id || this.anuncio.equipo;
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
