import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventoService } from '../../../core/services/evento.service';
import { ChatEquipoService } from '../../../core/services/chat-equipo.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-calendario-equipo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container py-4">
      <h2>Calendario y chat de equipo</h2>
      <div *ngIf="equipoId">
        <h4>Equipo: {{ equipoNombre || ('ID: ' + equipoId) }}</h4>
        <div class="row mt-4">
          <div class="col-md-6">
            <h5>Eventos del equipo</h5>
            <form *ngIf="esCreador" (ngSubmit)="crearEvento()" class="mb-3 row g-2 align-items-end">
              <div class="col-md-4">
                <label class="form-label">Tipo</label>
                <select class="form-select" [(ngModel)]="nuevoEvento.tipo" name="tipo" required>
                  <option value="partido">Partido</option>
                  <option value="entrenamiento">Entrenamiento</option>
                </select>
              </div>
              <div class="col-md-3">
                <label class="form-label">Fecha</label>
                <input type="date" class="form-control" [(ngModel)]="nuevoEvento.fecha" name="fecha" required>
              </div>
              <div class="col-md-2">
                <label class="form-label">Hora</label>
                <input type="time" class="form-control" style="width: 110px;" [(ngModel)]="nuevoEvento.hora" name="hora" required placeholder="hh:mm" value="19:00">
              </div>
              <div class="col-md-12">
                <label class="form-label">Lugar</label>
                <input type="text" class="form-control" [(ngModel)]="nuevoEvento.lugar" name="lugar" required>
              </div>
              <div class="col-12 mt-2">
                <label class="form-label">Descripción</label>
                <input type="text" class="form-control" [(ngModel)]="nuevoEvento.descripcion" name="descripcion">
              </div>
              <div class="col-12 mt-2">
                <button class="btn btn-primary" type="submit">Crear evento</button>
              </div>
            </form>
            <ul *ngIf="eventos.length > 0; else sinEventos">
              <li *ngFor="let ev of eventos">
                <strong>{{ ev.tipo | titlecase }}</strong> - {{ ev.fecha }} {{ ev.hora }}<br>
                <span>{{ ev.lugar }}</span>
                <span *ngIf="ev.descripcion"> - {{ ev.descripcion }}</span>
              </li>
            </ul>
            <ng-template #sinEventos>
              <p class="text-muted">No hay eventos para este equipo.</p>
            </ng-template>
          </div>
          <div class="col-md-6">
            <h5>Chat grupal del equipo</h5>
            <div class="chat-box mb-2" style="height: 300px; overflow-y: auto; background: #f8f9fa; border-radius: 8px; padding: 10px;">
              <div *ngFor="let msg of mensajesChat">
                <span class="fw-bold">{{ msg.emisor_username }}:</span>
                <span>{{ msg.contenido }}</span>
                <span class="text-muted" style="font-size: 0.8em;">({{ msg.timestamp | date:'shortTime' }})</span>
              </div>
              <div *ngIf="mensajesChat.length === 0" class="text-muted">No hay mensajes aún.</div>
            </div>
            <form (ngSubmit)="enviarMensajeChat()" class="d-flex gap-2">
              <input type="text" class="form-control" [(ngModel)]="nuevoMensaje" name="nuevoMensaje" placeholder="Escribe un mensaje..." required maxlength="300">
              <button class="btn btn-primary" type="submit">Enviar</button>
            </form>
          </div>
        </div>
      </div>
      <div *ngIf="!equipoId">
        <p class="text-danger">No se ha especificado el equipo.</p>
      </div>
    </div>
  `
})
export class CalendarioEquipoComponent implements OnInit {
  equipoId: number | null = null;
  equipoNombre: string | null = null;
  eventos: any[] = [];
  esCreador: boolean = false;
  nuevoEvento: any = { tipo: 'partido', fecha: '', hora: '19:00', lugar: '', descripcion: '' };

  chatEquipoId: number | null = null;
  mensajesChat: any[] = [];
  nuevoMensaje: string = '';

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoService,
    private chatEquipoService: ChatEquipoService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.equipoId = Number(this.route.snapshot.paramMap.get('id')) || null;
    if (this.equipoId) {
      this.obtenerNombreEquipo();
      this.cargarEventos();
      this.comprobarSiEsCreador();
      this.cargarChatEquipo();
    }
  }

  obtenerNombreEquipo() {
    this.http.get<any>(`http://localhost:8000/api/equipos/${this.equipoId}/`).subscribe({
      next: (equipo) => this.equipoNombre = equipo.nombre,
      error: () => this.equipoNombre = null
    });
  }

  cargarEventos() {
    if (!this.equipoId) return;
    this.eventoService.getEventosEquipo(this.equipoId).subscribe({
      next: (res) => this.eventos = res,
      error: () => this.eventos = []
    });
  }

  comprobarSiEsCreador() {
    const token = localStorage.getItem('access');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<any>(`http://localhost:8000/api/equipos/${this.equipoId}/`, { headers }).subscribe({
      next: (equipo) => {
        const userId = this.getUserIdFromToken(token);
        this.esCreador = equipo.creador === userId;
      },
      error: () => {
        this.esCreador = false;
      }
    });
  }

  getUserIdFromToken(token: string | null): number | null {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user_id || payload.id || null;
    } catch {
      return null;
    }
  }

  crearEvento() {
    if (!this.equipoId) return;
    const evento = { ...this.nuevoEvento, equipo: this.equipoId };
    this.eventoService.crearEvento(evento).subscribe({
      next: () => {
        this.nuevoEvento = { tipo: 'partido', fecha: '', hora: '19:00', lugar: '', descripcion: '' };
        this.cargarEventos();
      },
      error: () => alert('Error al crear evento')
    });
  }

  cargarChatEquipo() {
    if (!this.equipoId) return;
    this.chatEquipoService.getChatEquipoPorEquipo(this.equipoId).subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.chatEquipoId = res[0].id;
          this.cargarMensajesChat();
        } else {
          // Si no existe, lo creamos
          this.chatEquipoService.crearChatEquipo(this.equipoId!).subscribe({
            next: (nuevoChat) => {
              this.chatEquipoId = nuevoChat.id;
              this.cargarMensajesChat();
            },
            error: () => alert('Error al crear el chat grupal')
          });
        }
      },
      error: () => alert('Error al cargar el chat grupal')
    });
  }

  cargarMensajesChat() {
    if (!this.chatEquipoId) return;
    this.chatEquipoService.getMensajesChatEquipo(this.chatEquipoId).subscribe({
      next: (res) => this.mensajesChat = res,
      error: () => this.mensajesChat = []
    });
  }

  enviarMensajeChat() {
    if (!this.chatEquipoId || !this.nuevoMensaje.trim()) return;
    this.chatEquipoService.enviarMensajeChatEquipo(this.chatEquipoId, this.nuevoMensaje.trim()).subscribe({
      next: () => {
        this.nuevoMensaje = '';
        this.cargarMensajesChat();
      },
      error: () => alert('Error al enviar mensaje')
    });
  }
} 