import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-jugador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-jugador.component.html'
})
export class PerfilJugadorComponent implements OnInit {
  jugador: any = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://localhost:8000/api/jugadores/${id}/`).subscribe({
      next: (res) => this.jugador = res,
      error: (err) => console.error('Error al obtener jugador', err)
    });
  }
}
