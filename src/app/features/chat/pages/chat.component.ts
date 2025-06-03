import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../../core/services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
  chatId!: number;
  mensajes: any[] = [];
  nuevoMensaje: string = '';

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.chatId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarMensajes();
  }

  cargarMensajes(): void {
    this.chatService.getMensajes(this.chatId).subscribe({
      next: (res: any) => this.mensajes = res,
      error: (err: any) => console.error('Error al cargar mensajes', err)
    });
  }

  enviarMensaje(): void {
    if (!this.nuevoMensaje.trim()) return;

    this.chatService.enviarMensaje(this.chatId, this.nuevoMensaje).subscribe({
      next: () => {
        this.nuevoMensaje = '';
        this.cargarMensajes();
      },
      error: (err: any) => console.error('Error al enviar mensaje', err)
    });
  }
}
