import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-equipo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-equipo.component.html'
})
export class PerfilEquipoComponent implements OnInit {
  equipo: any = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://localhost:8000/api/equipos/${id}/`).subscribe({
      next: (res) => this.equipo = res,
      error: (err) => console.error('Error al obtener equipo', err)
    });
  }

  editarEquipo() {
    this.router.navigate(['/equipo', this.equipo.id, 'editar']);
  }
}
