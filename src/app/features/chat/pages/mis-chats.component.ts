import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../../core/services/chat.service';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-mis-chats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-chats.component.html'
})
export class MisChatsComponent implements OnInit {
  chats: any[] = [];
  misChats: any[] = [];
  cargando = true;
  miUsuarioId: number | null = null;

  constructor(private chatService: ChatService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('access');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Obtener el jugador del usuario autenticado
    this.http.get<any[]>('http://localhost:8000/api/jugadores/', { headers }).subscribe({
      next: (res) => {
        const jugador = res[0] || null;
        const miJugadorId = jugador ? jugador.id : null;

        this.chatService.getMisChats().subscribe({
          next: (chatsRes) => {
            this.chats = chatsRes;
            this.misChats = this.chats.filter(chat => chat.jugador === miJugadorId && chat.ultimo_mensaje);
            this.cargando = false;
          },
          error: (err) => {
            console.error('Error al cargar chats', err);
            this.cargando = false;
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener jugador:', err);
        this.cargando = false;
      }
    });
  }

  irAlChat(chatId: number) {
    this.router.navigate(['/chat', chatId]);
  }
} 