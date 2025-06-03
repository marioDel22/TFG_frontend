import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('access');
    console.log('[AuthGuard] Token en localStorage:', token);
    if (token) {
      return true;
    }
    console.log('[AuthGuard] No hay token, redirigiendo a login');
    this.router.navigate(['/login']);
    return false;
  }
}