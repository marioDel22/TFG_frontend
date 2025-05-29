import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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
    private http: HttpClient
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
    console.log('Mandar mensaje al jugador con ID:', this.anuncio.jugador.id);
    // Aquí irá la lógica real para abrir el chat
  }

  enviarInvitacion() {
    console.log('Enviar invitación al jugador con ID:', this.anuncio.jugador.id);
    // Aquí irá la lógica real para enviar la invitación
  }
}
