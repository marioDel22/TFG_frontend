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
    direccion: '',
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
    this.http.post('http://localhost:8000/api/equipos/', this.form).subscribe({
      next: () => this.router.navigate(['/inicio']),
      error: (err) => console.error('Error al crear equipo', err)
    });
  }
}
