import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    // Aquí implementaremos la lógica de autenticación
    console.log('Login data:', this.loginData);
    // Por ahora, simulamos un login exitoso
    localStorage.setItem('token', 'dummy-token');
    this.router.navigate(['/home']);
  }
} 