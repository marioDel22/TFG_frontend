import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-equipo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-equipo.component.html'
})
export class CrearEquipoComponent {
  form: any = {
    nombre: '',
    categoria: 'senior',
    primera_camiseta: '',
    primera_pantalon: '',
    segunda_camiseta: '',
    segunda_pantalon: '',
    descripcion: '',
    sexo: 'mixto'
  };

  categorias = ['infantil', 'cadete', 'juvenil', 'senior', 'veteranos'];
  sexos = ['masculino', 'femenino', 'mixto'];

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    console.log('Enviando datos:', this.form); // Para depuración
    this.http.post('http://localhost:8000/api/equipos/', this.form).subscribe({
      next: (res: any) => {
        console.log('Respuesta del servidor:', res); // Para depuración
        if (res && res.id) {
          this.router.navigate(['/equipo', res.id]);
        } else {
          console.error('La respuesta del servidor no contiene un ID válido');
          this.router.navigate(['/inicio']);
        }
      },
      error: (err: any) => {
        console.error('Error al crear equipo:', err);
      }
    });
  }
}
