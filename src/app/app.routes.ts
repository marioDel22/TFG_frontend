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
import { VerAnuncioJugadorPublicoComponent } from './features/anuncios/pages/ver-anuncio-jugador-publico/ver-anuncio-jugador-publico.component';
import { VerAnuncioEquipoPublicoComponent } from './features/anuncios/pages/ver-anuncio-equipo-publico/ver-anuncio-equipo-publico.component';
import { ChatComponent } from './features/chat/pages/chat.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'jugador/nuevo', component: CrearJugadorComponent, canActivate: [AuthGuard] },
    { path: 'equipo/nuevo', component: CrearEquipoComponent, canActivate: [AuthGuard] },  
    { path: 'equipo/:id', component: PerfilEquipoComponent, canActivate: [AuthGuard] },
    { path: 'equipo/:id/editar', component: EditarEquipoComponent, canActivate: [AuthGuard] },
    { path: 'equipo/:id/calendario', loadComponent: () => import('./features/equipos/pages/calendario-equipo.component').then(m => m.CalendarioEquipoComponent), canActivate: [AuthGuard] },
    { path: 'jugador/:id', component: PerfilJugadorComponent, canActivate: [AuthGuard] },
    { path: 'jugador/:id/editar', component: EditarJugadorComponent, canActivate: [AuthGuard] },
    { path: 'anuncio-equipo/nuevo/:equipoId', component: CrearAnuncioEquipoComponent, canActivate: [AuthGuard] },
    { path: 'anuncio-equipo/editar/:id', component: EditarAnuncioEquipoComponent, canActivate: [AuthGuard] },
    { path: 'anuncio-equipo/:id', component: VerAnuncioEquipoComponent, canActivate: [AuthGuard] },
    { path: 'anuncio-equipo/:id/chats', loadComponent: () => import('./features/chat/pages/chats-anuncio-equipo.component').then(m => m.ChatsAnuncioEquipoComponent), canActivate: [AuthGuard] },
    { path: 'anuncio-jugador/nuevo', component: CrearAnuncioJugadorComponent, canActivate: [AuthGuard] },
    { path: 'anuncio-jugador/:id', loadComponent: () => import('./features/jugadores/pages/ver-anuncio-jugador/ver-anuncio-jugador.component').then(m => m.VerAnuncioJugadorComponent), canActivate: [AuthGuard] },
    { path: 'anuncio-jugador/:id/editar', loadComponent: () => import('./features/anuncios/pages/editar-anuncio-jugador/editar-anuncio-jugador.component').then(m => m.EditarAnuncioJugadorComponent), canActivate: [AuthGuard] },
    { path: 'anuncios-jugadores',  loadComponent: () => import('./features/anuncios/pages/ver-anuncios-jugadores/ver-anuncios-jugadores.component').then(m => m.VerAnunciosJugadoresComponent), canActivate: [AuthGuard] },
    { path: 'anuncios-jugador', loadComponent: () => import('./features/anuncios/pages/listado-anuncios-jugador/listado-anuncios-jugador.component').then(m => m.ListadoAnunciosJugadorComponent), canActivate: [AuthGuard] },
    { path: 'anuncios-equipos', component: ListadoAnunciosEquipoComponent, canActivate: [AuthGuard] },
    { path: 'ver-anuncio-jugador-publico/:id', component: VerAnuncioJugadorPublicoComponent },
    { path: 'buscar-jugadores', component: ListadoAnunciosJugadorComponent, canActivate: [AuthGuard] },
    { path: 'ver-anuncio-equipo-publico/:id', component: VerAnuncioEquipoPublicoComponent },
    { path: 'chat/:id', component: ChatComponent, canActivate: [AuthGuard] },
    { path: 'mis-chats', loadComponent: () => import('./features/chat/pages/mis-chats.component').then(m => m.MisChatsComponent), canActivate: [AuthGuard] },
    { path: 'invitaciones', loadComponent: () => import('./features/jugadores/pages/invitaciones.component').then(m => m.InvitacionesComponent), canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'login' }
  ];