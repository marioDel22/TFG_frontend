import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {
  jugador: any = null;
  equipos: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);

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
}
