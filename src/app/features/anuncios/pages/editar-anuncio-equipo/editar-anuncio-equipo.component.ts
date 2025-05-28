import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-anuncio-equipo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-anuncio-equipo.component.html'
})
export class EditarAnuncioEquipoComponent implements OnInit {
  anuncioId!: string;
  equipoId!: number;

  form: any = {
    dia_partido: '',
    horario_partido: '',
    direccion_partido: '',
    dia_entrenamiento: '',
    horario_entrenamiento: '',
    direccion_entrenamiento: '',
    descripcion: ''
  };

  dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo', 'indiferente'];
  horarios = ['manana', 'tarde', 'todo_dia', 'indiferente'];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.anuncioId = this.route.snapshot.paramMap.get('id')!;

    this.http.get<any>(`http://localhost:8000/api/anuncios-equipo/${this.anuncioId}/`).subscribe({
      next: (res) => {
        this.form = {
          dia_partido: res.dia_partido,
          horario_partido: res.horario_partido,
          direccion_partido: res.direccion_partido,
          dia_entrenamiento: res.dia_entrenamiento,
          horario_entrenamiento: res.horario_entrenamiento,
          direccion_entrenamiento: res.direccion_entrenamiento,
          descripcion: res.descripcion
        };
        this.equipoId = res.equipo;  // para redirigir después
      },
      error: (err) => console.error('Error al cargar anuncio', err)
    });
  }

  onSubmit() {
    this.http.patch(`http://localhost:8000/api/anuncios-equipo/${this.anuncioId}/`, this.form).subscribe({
      next: () => this.router.navigate(['/equipo', this.equipoId]),
      error: (err) => console.error('Error al actualizar anuncio', err)
    });
  }
}
