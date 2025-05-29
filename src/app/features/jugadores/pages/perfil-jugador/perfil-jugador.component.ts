import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface AnuncioJugador {
  id: number;
  disponibilidad_dia: string;
  disponibilidad_horaria: string;
  sexo: string;
  descripcion: string;
}

interface Jugador {
  id: number;
  nombre: string;
  edad: number;
  altura: number;
  posicion: string;
  nivel: string;
  correo: string;
  direccion: string;
  sexo: string;
  descripcion: string;
  anuncio?: AnuncioJugador;
}

@Component({
  selector: 'app-perfil-jugador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-jugador.component.html'
})
export class PerfilJugadorComponent implements OnInit {
  jugador: Jugador | null = null;
  anuncio: AnuncioJugador | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<Jugador>(`http://localhost:8000/api/jugadores/${id}/`).subscribe({
      next: (res) => {
        this.jugador = res;
        this.anuncio = res.anuncio || null;
      },
      error: (err) => console.error('Error al obtener jugador', err)
    });
  }

  publicarAnuncio() {
    this.router.navigate(['/anuncio-jugador/nuevo']);
  }

  verAnuncio() {
    if (this.anuncio && this.anuncio.id) {
      this.router.navigate(['/anuncio-jugador', this.anuncio.id]);
    }
  }

  verAnunciosEquipos() {
    this.router.navigate(['/anuncios-equipos']);
  }
}
