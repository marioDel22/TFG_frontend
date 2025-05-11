import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
    this.http.get<any[]>('http://localhost:8000/api/jugadores/').subscribe({
      next: (res) => this.jugador = res[0] || null
    });

    this.http.get<any[]>('http://localhost:8000/api/equipos/').subscribe({
      next: (res) => this.equipos = res
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
