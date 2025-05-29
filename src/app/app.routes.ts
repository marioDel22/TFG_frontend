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
import { CrearAnuncioEquipoComponent } from './features/anuncios/pages/crear-anuncio-equipo/crear-anuncio-equipo.component';
import { EditarAnuncioEquipoComponent } from './features/anuncios/pages/editar-anuncio-equipo/editar-anuncio-equipo.component';
import { CrearAnuncioJugadorComponent } from './features/anuncios/pages/crear-anuncio-jugador/crear-anuncio-jugador.component';
import { ListadoAnunciosJugadorComponent } from './features/anuncios/pages/listado-anuncios-jugador/listado-anuncios-jugador.component';
import { VerAnuncioEquipoComponent } from './features/anuncios/pages/ver-anuncio-equipo/ver-anuncio-equipo.component';
import { ListadoAnunciosEquipoComponent } from './features/anuncios/pages/listado-anuncios-equipo/listado-anuncios-equipo.component';












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
    { path: 'anuncio-equipo/nuevo/:equipoId', component: CrearAnuncioEquipoComponent },
    { path: 'anuncio-equipo/editar/:id', component: EditarAnuncioEquipoComponent },
    { path: 'anuncio-equipo/:id', component: VerAnuncioEquipoComponent },
    { path: 'anuncio-jugador/nuevo', component: CrearAnuncioJugadorComponent },
    { path: 'anuncio-jugador/:id', loadComponent: () => import('./features/jugadores/pages/ver-anuncio-jugador/ver-anuncio-jugador.component').then(m => m.VerAnuncioJugadorComponent) },
    { path: 'anuncios-jugadores',  loadComponent: () => import('./features/anuncios/pages/ver-anuncios-jugadores/ver-anuncios-jugadores.component').then(m => m.VerAnunciosJugadoresComponent)    },
    { path: 'anuncios-jugador', loadComponent: () => import('./features/anuncios/pages/listado-anuncios-jugador/listado-anuncios-jugador.component').then(m => m.ListadoAnunciosJugadorComponent)    },
    { path: 'anuncios-equipos', component: ListadoAnunciosEquipoComponent },
    { path: 'buscar-jugadores', component: ListadoAnunciosJugadorComponent },
    { path: '**', redirectTo: 'login' }
    
  ];