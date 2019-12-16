import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { RoomService } from 'src/app/room.service';


@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  rooms: Observable<string[]>;
  currentRoom: string;
  private _roomSub: Subscription;

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.rooms = this.roomService.rooms;
    this._roomSub = this.roomService.currentRoom.subscribe(room => this.currentRoom = room.id);
  }

  ngOnDestroy() {
    this._roomSub.unsubscribe();
  }

  loadRoom(id: string) {
    this.roomService.getRoom(id);
  }

  newRoom() {
    this.roomService.newRoom();
  }

}
