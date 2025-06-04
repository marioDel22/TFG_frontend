import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../../core/services/chat.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chats-anuncio-equipo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h3>Chats de este anuncio de equipo</h3>
      <div *ngIf="cargando">
        <p>Cargando chats...</p>
      </div>
      <div *ngIf="!cargando && chats.length === 0">
        <p class="text-muted">No hay chats para este anuncio todavía.</p>
      </div>
      <ul class="list-group" *ngIf="!cargando && chats.length > 0">
        <li class="list-group-item d-flex justify-content-between align-items-center" *ngFor="let chat of chats">
          <div>
            <strong>Jugador:</strong> {{ chat.jugador_nombre }}<br />
            <span *ngIf="chat.ultimo_mensaje">
              <strong>Último mensaje:</strong> {{ chat.ultimo_mensaje.contenido }}<br />
              <small class="text-muted">{{ chat.ultimo_mensaje.timestamp | date:'short' }}</small>
            </span>
          </div>
          <button class="btn btn-primary" (click)="irAlChat(chat.id)">Ver chat</button>
        </li>
      </ul>
    </div>
  `
})
export class ChatsAnuncioEquipoComponent implements OnInit {
  chats: any[] = [];
  cargando = true;
  anuncioId!: number;

  constructor(private route: ActivatedRoute, private chatService: ChatService, private router: Router) {}

  ngOnInit(): void {
    this.anuncioId = Number(this.route.snapshot.paramMap.get('id'));
    this.chatService.getChatsPorAnuncioEquipo(this.anuncioId).subscribe({
      next: (res: any) => {
        this.chats = res.filter((chat: any) => chat.ultimo_mensaje);
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al cargar chats', err);
        this.cargando = false;
      }
    });
  }

  irAlChat(chatId: number) {
    this.router.navigate(['/chat', chatId]);
  }
} 