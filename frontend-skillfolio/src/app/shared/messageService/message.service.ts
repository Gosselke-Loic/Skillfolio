import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: string[] = []

  addMsg(message: string): void {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}