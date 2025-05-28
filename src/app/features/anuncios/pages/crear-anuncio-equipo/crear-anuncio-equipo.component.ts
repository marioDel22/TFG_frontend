import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-anuncio-equipo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-anuncio-equipo.component.html'
})
export class CrearAnuncioEquipoComponent implements OnInit {
  equipoId!: string;

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

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.equipoId = this.route.snapshot.paramMap.get('equipoId')!;
  }

  onSubmit() {
    const payload = {
      ...this.form,
      equipo_id: Number(this.equipoId)  // ✅ nombre correcto y tipo número
    };
  
    this.http.post('http://localhost:8000/api/anuncios-equipo/', payload).subscribe({
      next: () => this.router.navigate(['/equipo', this.equipoId]),
      error: (err) => console.error('Error al crear anuncio', err)
    });
  }
}
