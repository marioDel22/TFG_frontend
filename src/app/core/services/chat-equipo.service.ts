import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatEquipoService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getChatEquipoPorEquipo(equipoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/chats-equipo/?equipo=${equipoId}`);
  }

  crearChatEquipo(equipoId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/chats-equipo/`, { equipo: equipoId });
  }

  getMensajesChatEquipo(chatId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mensajes-chat-equipo/?chat=${chatId}`);
  }

  enviarMensajeChatEquipo(chatId: number, contenido: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/mensajes-chat-equipo/`, { chat: chatId, contenido });
  }
} 