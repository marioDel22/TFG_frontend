import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-anuncio-jugador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-anuncio-jugador.component.html'
})
export class EditarAnuncioJugadorComponent implements OnInit {
  anuncioId!: string;
  form: any = {
    disponibilidad_dia: '',
    disponibilidad_horaria: '',
    descripcion: '',
    sexo: ''
  };
  cargando = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.anuncioId = this.route.snapshot.paramMap.get('id')!;
    this.http.get<any>(`http://localhost:8000/api/anuncios-jugador/${this.anuncioId}/`).subscribe({
      next: (res) => {
        this.form = {
          disponibilidad_dia: res.disponibilidad_dia,
          disponibilidad_horaria: res.disponibilidad_horaria,
          descripcion: res.descripcion,
          sexo: res.sexo
        };
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el anuncio';
        this.cargando = false;
      }
    });
  }

  onSubmit() {
    this.http.patch(`http://localhost:8000/api/anuncios-jugador/${this.anuncioId}/`, this.form).subscribe({
      next: () => this.router.navigate(['/anuncio-jugador', this.anuncioId]),
      error: (err) => this.error = 'Error al guardar cambios'
    });
  }
} 