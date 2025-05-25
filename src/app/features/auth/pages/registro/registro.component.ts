import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html'
})
export class RegistroComponent {
  form: any = {
    username: '',
    email: '',
    password: '',
    re_password: ''
  };

  error: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('http://localhost:8000/api/auth/users/', this.form).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        console.error('Error al registrar usuario', err);
        this.error = 'No se pudo registrar. Verifica los campos.';
      }
    });
  }
}
