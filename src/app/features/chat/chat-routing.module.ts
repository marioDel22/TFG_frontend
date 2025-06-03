import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './pages/chat.component';
import { MisChatsComponent } from './pages/mis-chats.component';

const routes: Routes = [
  { path: 'chat/:id', component: ChatComponent },
  { path: 'mis-chats', component: MisChatsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
