import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listado-anuncios-equipo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listado-anuncios-equipo.component.html'
})
export class ListadoAnunciosEquipoComponent implements OnInit {
  anuncios: any[] = [];

  filtros = {
    distancia: '',
    dia_partido: '',
    horario_partido: '',
    dia_entrenamiento: '',
    horario_entrenamiento: '',
    sexo: ''
  };

  
  dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo', 'indiferente'];
  horarios = ['manana', 'tarde', 'todo_dia', 'indiferente'];
  sexos = ['masculino', 'femenino', 'mixto'];

  latitud: number | null = null;
  longitud: number | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8000/api/jugadores/').subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.latitud = res[0].latitud;
          this.longitud = res[0].longitud;
        }
        this.cargarAnuncios();
      },
      error: (err) => {
        console.error('Error al obtener jugador', err);
        this.cargarAnuncios();
      }
    });
  }

  cargarAnuncios() {
    let params = new HttpParams();
    for (const key in this.filtros) {
      const value = (this.filtros as any)[key];
      if (value) {
        if (key === 'sexo') {
          params = params.set('equipo__sexo', value);
        } else {
          params = params.set(key, value);
        }
      }
    }

    if (this.latitud && this.longitud && this.filtros.distancia) {
      params = params.set('latitud', this.latitud);
      params = params.set('longitud', this.longitud);
    }

    this.http.get<any[]>('http://localhost:8000/api/anuncios-equipo/', { params }).subscribe({
      next: (res) => {
        console.log('API anuncios-equipo response:', res);
        this.anuncios = res;
        this.anuncios.forEach((anuncio, idx) => {
          if (anuncio.equipo) {
            this.http.get<any>(`http://localhost:8000/api/equipos/${anuncio.equipo}/`).subscribe({
              next: (equipoData) => this.anuncios[idx].equipo = equipoData,
              error: (err) => console.error('Error al obtener equipo', err)
            });
          }
        });
      },
      error: (err) => console.error('Error al obtener anuncios', err)
    });
  }

  verAnuncio(id: number) {
    this.router.navigate(['/ver-anuncio-equipo-publico', id]);
  }
}
