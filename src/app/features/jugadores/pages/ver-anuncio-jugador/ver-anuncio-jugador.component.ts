import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ver-anuncio-jugador',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ver-anuncio-jugador.component.html'
})
export class VerAnuncioJugadorComponent implements OnInit {
  anuncio: any = null;
  anuncioId!: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.anuncioId = this.route.snapshot.paramMap.get('id')!;
    this.http.get(`http://localhost:8000/api/anuncios-jugador/${this.anuncioId}/`).subscribe({
      next: (res) => this.anuncio = res,
      error: (err) => console.error('Error al cargar anuncio:', err)
    });
  }

  editarAnuncio() {
    this.router.navigate(['/anuncio-jugador', this.anuncioId, 'editar']);
  }

  eliminarAnuncio() {
    if (confirm('¿Estás seguro de que quieres eliminar el anuncio?')) {
      this.http.delete(`http://localhost:8000/api/anuncios-jugador/${this.anuncioId}/`).subscribe({
        next: () => this.router.navigate(['/inicio']),
        error: (err) => console.error('Error al eliminar anuncio', err)
      });
    }
  }

  abrirChat() {
    this.router.navigate(['/mis-chats']);
  }
}
