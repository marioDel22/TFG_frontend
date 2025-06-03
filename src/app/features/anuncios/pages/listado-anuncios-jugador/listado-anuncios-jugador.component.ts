import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../../core/services/chat.service';

@Component({
  selector: 'app-listado-anuncios-jugador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listado-anuncios-jugador.component.html'
})
export class ListadoAnunciosJugadorComponent implements OnInit {
  anuncios: any[] = [];
  filtrados: any[] = [];

  filtro = {
    posicion: '',
    nivel: '',
    dia: '',
    horario: ''
  };

  posiciones = ['base', 'escolta', 'alero', 'ala_pivot', 'pivot'];
  niveles = ['relajado', 'intermedio', 'alto'];
  dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo', 'indiferente'];
  horarios = ['manana', 'tarde', 'todo_dia', 'indiferente'];

  equipoSeleccionadoId: number | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private chatService: ChatService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.equipoSeleccionadoId = params['equipoId'] ? +params['equipoId'] : null;
    });
    this.http.get<any[]>('http://localhost:8000/api/anuncios-jugador/').subscribe({
      next: (res: any[]) => {
        this.anuncios = res.sort((a, b) => a.jugador.nombre.localeCompare(b.jugador.nombre));
        this.filtrados = [...this.anuncios];
      },
      error: (err: any) => console.error('Error al obtener anuncios', err)
    });
  }

  aplicarFiltros() {
    this.filtrados = this.anuncios.filter(anuncio =>
      (!this.filtro.posicion || anuncio.jugador.posicion === this.filtro.posicion) &&
      (!this.filtro.nivel || anuncio.jugador.nivel === this.filtro.nivel) &&
      (!this.filtro.dia || anuncio.disponibilidad_dia === this.filtro.dia) &&
      (!this.filtro.horario || anuncio.disponibilidad_horaria === this.filtro.horario)
    );
  }

  verAnuncio(id: number) {
    this.router.navigate(['/ver-anuncio-jugador-publico', id], { queryParams: { equipoId: this.equipoSeleccionadoId } });
  }

  mandarMensaje(jugadorId: number) {
    if (!this.equipoSeleccionadoId) {
      alert('Selecciona un equipo primero');
      return;
    }
    this.chatService.iniciarChatConJugador(jugadorId, this.equipoSeleccionadoId).subscribe({
      next: (res: any) => {
        const chatId = res.chat_id;
        this.router.navigate(['/chat', chatId]);
      },
      error: (err: any) => console.error('Error al iniciar chat', err)
    });
  }
}
