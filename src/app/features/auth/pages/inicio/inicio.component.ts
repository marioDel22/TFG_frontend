import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {
  jugador: any = null;
  equipos: any[] = [];
  mostrarFormularioReporte = false;
  motivoReporte = '';
  descripcionReporte = '';
  enviandoReporte = false;
  mensajeReporte = '';
  errorReporte = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('access');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>('http://localhost:8000/api/jugadores/', { headers }).subscribe({
      next: (res) => this.jugador = res[0] || null,
      error: (err) => console.error('Error al obtener jugador:', err)
    });

    this.http.get<any[]>('http://localhost:8000/api/mis-equipos-creados/', { headers }).subscribe({
      next: (res) => this.equipos = res,
      error: (err) => console.error('Error al obtener equipos:', err)
    });
  }

  irAlPerfilJugador() {
    this.router.navigate(['/jugador', this.jugador.id]);
  }

  irAlPerfilEquipo(id: number) {
    this.router.navigate(['/equipo', id]);
  }

  crearJugador() {
    this.router.navigate(['/jugador/nuevo']);
  }

  crearEquipo() {
    this.router.navigate(['/equipo/nuevo']);
  }

  eliminarCuenta() {
    if (!confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      return;
    }
    const token = localStorage.getItem('access');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.delete('http://localhost:8000/api/eliminar-usuario/', { headers }).subscribe({
      next: () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        this.router.navigate(['/login']);
        alert('Tu cuenta ha sido eliminada correctamente.');
      },
      error: () => {
        alert('Error al eliminar la cuenta.');
      }
    });
  }

  enviarReporte() {
    // El usuario reportado es el propio usuario logueado
    const token = localStorage.getItem('access');
    if (!token) {
      this.errorReporte = 'No se ha encontrado el usuario autenticado.';
      return;
    }
    // Decodificar el token para obtener el id de usuario
    let userId: number | null = null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userId = payload.user_id || payload.id || null;
    } catch {
      this.errorReporte = 'No se pudo obtener el usuario.';
      return;
    }
    if (!userId) {
      this.errorReporte = 'No se pudo obtener el usuario.';
      return;
    }
    this.enviandoReporte = true;
    this.mensajeReporte = '';
    this.errorReporte = '';
    const headers = { Authorization: `Bearer ${token}` };
    const payload = {
      reportado: userId,
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
