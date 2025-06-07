import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

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
  misEquipos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public router: Router
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (!id && this.router.url.startsWith('/perfil')) {
      // Obtener el id del usuario logueado desde el token JWT
      const token = localStorage.getItem('access');
      if (token) {
        const helper = new JwtHelperService();
        const decoded: any = helper.decodeToken(token);
        id = decoded.user_id || decoded.id;
      }
    }
    if (id) {
      this.http.get<Jugador>(`http://localhost:8000/api/jugadores/${id}/`).subscribe({
        next: (res) => {
          this.jugador = res;
          this.anuncio = res.anuncio || null;
          this.cargarMisEquipos();
        },
        error: (err) => console.error('Error al obtener jugador', err)
      });
    }
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

  cargarMisEquipos() {
    const token = localStorage.getItem('access');
    const headers = { Authorization: `Bearer ${token}` };
    this.http.get<any[]>('http://localhost:8000/api/mis-equipos/', { headers }).subscribe({
      next: (equipos) => this.misEquipos = equipos,
      error: () => this.misEquipos = []
    });
  }

  entrarCalendarioEquipo(equipoId: number) {
    this.router.navigate(['/equipo', equipoId, 'calendario']);
  }
}
