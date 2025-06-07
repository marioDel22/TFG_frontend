import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  isLoginPage = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Suscribirse a los cambios de ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Actualizar isLoginPage basado en la ruta actual
      this.isLoginPage = event.url.startsWith('/login') || event.url.startsWith('/registro');
      // Actualizar estado de login en cada navegación
      this.checkLoginStatus();
      console.log('[ngOnInit] url:', event.url, 'isLoginPage:', this.isLoginPage, 'isLoggedIn:', this.isLoggedIn);
    });

    // Verificar si el usuario está logueado (esto dependerá de tu sistema de autenticación)
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    // Verificar si existe un token de acceso válido
    const token = localStorage.getItem('access');
    this.isLoggedIn = !!token;
    console.log('[checkLoginStatus] access:', token, 'isLoggedIn:', this.isLoggedIn);
  }

  logout() {
    // Eliminar los tokens de acceso y refresco
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  irAInicio(event: Event) {
    event.preventDefault();
    this.router.navigate(['/inicio']);
  }
}
