import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  iniciarChatConJugador(jugadorId: number, equipoId: number | null) {
    return this.http.post<{ chat_id: number; creado: boolean }>(
      `${this.apiUrl}/iniciar-chat/`,
      { jugador_id: jugadorId, equipo_id: equipoId }
    );
  }

  iniciarChatConEquipo(jugadorId: number, equipoId: number) {
    return this.http.post<{ chat_id: number; creado: boolean }>(
      `${this.apiUrl}/iniciar-chat/`,
      { jugador_id: jugadorId, equipo_id: equipoId }
    );
  }

  getMensajes(chatId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/mensajes/?chat=${chatId}`);
  }

  enviarMensaje(chatId: number, contenido: string) {
    return this.http.post(`${this.apiUrl}/mensajes/`, { chat: chatId, contenido });
  }

  getMisChats() {
    return this.http.get<any[]>(`${this.apiUrl}/chats/`);
  }

  getChatsPorAnuncioEquipo(anuncioEquipoId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/chats/?anuncio_equipo=${anuncioEquipoId}`);
  }
} 