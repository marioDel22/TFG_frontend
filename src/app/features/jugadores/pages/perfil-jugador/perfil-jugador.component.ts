import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  user: number;
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
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil-jugador.component.html'
})
export class PerfilJugadorComponent implements OnInit {
  jugador: Jugador | null = null;
  anuncio: AnuncioJugador | null = null;
  misEquipos: any[] = [];
  mostrarFormularioReporte = false;
  motivoReporte = '';
  descripcionReporte = '';
  enviandoReporte = false;
  mensajeReporte = '';
  errorReporte = '';

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

  enviarReporte() {
    if (!this.jugador || !this.jugador.user) {
      this.errorReporte = 'No se puede reportar este usuario.';
      return;
    }
    this.enviandoReporte = true;
    this.mensajeReporte = '';
    this.errorReporte = '';
    const token = localStorage.getItem('access');
    const headers = { Authorization: `Bearer ${token}` };
    const payload = {
      reportado: this.jugador.user,
      motivo: this.motivoReporte,
      descripcion: this.descripcionReporte
    };
    this.http.post('http://localhost:8000/api/reportes/', payload, { headers }).subscribe({
      next: () => {
        this.mensajeReporte = 'Reporte enviado correctamente. ¡Gracias por ayudarnos a mantener la comunidad segura!';
        this.motivoReporte = '';
        this.descripcionReporte = '';
        this.mostrarFormularioReporte = false;
        this.enviandoReporte = false;
      },
      error: (err) => {
        this.errorReporte = err.error?.detail || 'Error al enviar el reporte.';
        this.enviandoReporte = false;
      }
    });
  }
}
