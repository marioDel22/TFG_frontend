import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { InicioComponent } from './features/auth/pages/inicio/inicio.component';
import { CrearJugadorComponent } from './features/jugadores/pages/crear-jugador/crear-jugador.component';
import { CrearEquipoComponent } from './features/equipos/pages/crear-equipo/crear-equipo.component';
import { PerfilEquipoComponent } from './features/equipos/pages/perfil-equipo/perfil-equipo.component';
import { EditarEquipoComponent } from './features/equipos/pages/editar-equipo/editar-equipo.component';
import { RegistroComponent } from './features/auth/pages/registro/registro.component';
import { PerfilJugadorComponent } from './features/jugadores/pages/perfil-jugador/perfil-jugador.component';
import { EditarJugadorComponent } from './features/jugadores/pages/editar-jugador/editar-jugador.component';






export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'inicio', component: InicioComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'jugador/nuevo', component: CrearJugadorComponent },
    { path: 'equipo/nuevo', component: CrearEquipoComponent },
    { path: 'equipo/:id', component: PerfilEquipoComponent },
    { path: 'equipo/:id/editar', component: EditarEquipoComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'jugador/:id', component: PerfilJugadorComponent },
    { path: 'jugador/:id/editar', component: EditarJugadorComponent },
    { path: '**', redirectTo: 'login' }
  ];