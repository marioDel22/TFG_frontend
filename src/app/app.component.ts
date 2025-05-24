import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router) {}

  title = 'basketconecta-frontend';

  logout() {
    // Aquí puedes agregar la lógica para cerrar sesión, por ejemplo, limpiar el token o el estado de autenticación
    console.log('Logout clicked');
    this.router.navigate(['/login']);
  }
}
