import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Room } from './models/room';
import { Player } from './models/player';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  currentRoom = this.socket.fromEvent<Room>('room');
  rooms = this.socket.fromEvent<string[]>('rooms');

  constructor(private socket: Socket) { }

  getRoom(id: string) {
    this.socket.emit('getRoom', id);
  }

  newRoom() {
    this.socket.emit('addRoom', { id: this.roomId(), room: '', players: [] });
  }

  editRoom(room: Room) {
    this.socket.emit('editRoom', room);
  }

  registerPlayer(roomId: string, player: Player) {
    this.socket.emit('registerPlayer', { roomId: roomId, player: player });
  }

  private roomId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

}
