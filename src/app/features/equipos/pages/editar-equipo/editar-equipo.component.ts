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
    direccion: '',
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
      next: (res) => this.form = res,
      error: () => console.error('No se pudo cargar el equipo')
    });
  }

  onSubmit() {
    this.http.patch(`http://localhost:8000/api/equipos/${this.equipoId}/`, this.form).subscribe({
      next: () => this.router.navigate(['/inicio']),
      error: (err) => console.error('Error al actualizar el equipo', err)
    });
  }
}
