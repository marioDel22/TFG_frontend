import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../../core/services/chat.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-chats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-chats.component.html'
})
export class MisChatsComponent implements OnInit {
  chats: any[] = [];
  cargando = true;

  constructor(private chatService: ChatService, private router: Router) {}

  ngOnInit(): void {
    this.chatService.getMisChats().subscribe({
      next: (res) => {
        this.chats = res;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar chats', err);
        this.cargando = false;
      }
    });
  }

  irAlChat(chatId: number) {
    this.router.navigate(['/chat', chatId]);
  }
} 