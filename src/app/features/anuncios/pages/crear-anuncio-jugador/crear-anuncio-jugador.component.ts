import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-anuncio-jugador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-anuncio-jugador.component.html'
})
export class CrearAnuncioJugadorComponent implements OnInit {
  jugadorId!: number;

  form: any = {
    disponibilidad_dia: '',
    disponibilidad_horaria: '',
    descripcion: '',
    sexo: ''
  };

  dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo', 'indiferente'];
  horarios = ['manana', 'tarde', 'todo_dia', 'indiferente'];
  sexos = ['masculino', 'femenino', 'mixto', 'indiferente'];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8000/api/jugadores/').subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.jugadorId = res[0].id;
        } else {
          console.error('El usuario no tiene jugador creado');
        }
      },
      error: (err) => console.error('Error al cargar jugador', err)
    });
  }

  onSubmit() {
    const payload = {
      ...this.form,
      jugador_id: this.jugadorId
    };

    this.http.post('http://localhost:8000/api/anuncios-jugador/', payload).subscribe({
      next: () => this.router.navigate(['/inicio']),
      error: (err) => console.error('Error al crear anuncio', err)
    });
  }
}
