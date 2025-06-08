import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recuperar-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.scss']
})
export class RecuperarPasswordComponent {
  email = '';
  mensaje = '';
  error = '';
  loading = false;

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.mensaje = '';
    this.error = '';
    this.loading = true;
    this.http.post('http://localhost:8000/api/password-reset/', { email: this.email }).subscribe({
      next: (res: any) => {
        this.mensaje = res.message;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Error al enviar el correo.';
        this.loading = false;
      }
    });
  }
}
