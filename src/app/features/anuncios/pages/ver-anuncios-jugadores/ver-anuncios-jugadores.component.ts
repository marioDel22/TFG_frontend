import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-anuncios-jugadores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-anuncios-jugadores.component.html'
})
export class VerAnunciosJugadoresComponent implements OnInit {
  anuncios: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8000/api/anuncios-jugador/').subscribe({
      next: (res) => this.anuncios = res,
      error: (err) => console.error('Error al obtener anuncios de jugadores', err)
    });
  }

  verDetalle(id: number) {
    this.router.navigate(['/anuncio-jugador', id]);
  }
}
