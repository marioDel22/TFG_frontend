import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-equipo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-equipo.component.html'
})
export class EditarEquipoComponent implements OnInit {
  form: any = {
    nombre: '',
    categoria: '',
    primera_camiseta: '',
    primera_pantalon: '',
    segunda_camiseta: '',
    segunda_pantalon: '',
    descripcion: '',
    sexo: ''
  };

  categorias = ['infantil', 'cadete', 'juvenil', 'senior', 'veteranos'];
  sexos = ['masculino', 'femenino', 'mixto'];
  equipoId!: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.equipoId = this.route.snapshot.paramMap.get('id')!;
    this.http.get(`http://localhost:8000/api/equipos/${this.equipoId}/`).subscribe({
      next: (res) => {
        console.log('Datos del equipo cargados:', res); // Para depuración
        this.form = res;
      },
      error: (err) => {
        console.error('Error al cargar el equipo:', err);
      }
    });
  }

  onSubmit() {
    console.log('Enviando datos actualizados:', this.form); // Para depuración
    this.http.patch(`http://localhost:8000/api/equipos/${this.equipoId}/`, this.form).subscribe({
      next: (res: any) => {
        console.log('Respuesta del servidor:', res); // Para depuración
        this.router.navigate(['/equipo', this.equipoId]);
      },
      error: (err: any) => {
        console.error('Error al actualizar equipo:', err);
      }
    });
  }
}
