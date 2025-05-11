import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-jugador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-jugador.component.html'
})
export class CrearJugadorComponent {
  form: any = {
    nombre: '',
    edad: '',
    altura: '',
    posicion: 'base',
    direccion: '',
    nivel: 'relajado',
    descripcion: '',
    correo: '',
    sexo: 'masculino'
  };

  posiciones = ['base', 'escolta', 'alero', 'ala_pivot', 'pivot'];
  niveles = ['relajado', 'intermedio', 'alto'];
  sexos = ['masculino', 'femenino'];

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('http://localhost:8000/api/jugadores/', this.form).subscribe({
      next: () => this.router.navigate(['/inicio']),
      error: (err) => console.error('Error al crear jugador', err)
    });
  }
}
