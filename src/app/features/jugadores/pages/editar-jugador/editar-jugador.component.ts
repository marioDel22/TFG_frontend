import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-jugador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-jugador.component.html'
})
export class EditarJugadorComponent implements OnInit {
  jugadorId!: string;
  form: any = {
    nombre: '',
    edad: '',
    altura: '',
    posicion: '',
    direccion: '',
    nivel: '',
    descripcion: '',
    correo: '',
    sexo: ''
  };

  posiciones = ['base', 'escolta', 'alero', 'ala_pivot', 'pivot'];
  niveles = ['relajado', 'intermedio', 'alto'];
  sexos = ['masculino', 'femenino'];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.jugadorId = this.route.snapshot.paramMap.get('id')!;
    this.http.get(`http://localhost:8000/api/jugadores/${this.jugadorId}/`).subscribe({
      next: (res) => this.form = res,
      error: () => console.error('Error al cargar el jugador')
    });
  }

  onSubmit() {
    this.http.patch(`http://localhost:8000/api/jugadores/${this.jugadorId}/`, this.form).subscribe({
      next: () => this.router.navigate(['/jugador', this.jugadorId]),
      error: (err) => console.error('Error al actualizar el jugador', err)
    });
  }
}
