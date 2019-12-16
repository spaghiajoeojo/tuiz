import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoomService } from 'src/app/room.service';
import { Subscription } from 'rxjs';
import { Room } from 'src/app/models/room';
import { startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../models/player';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  player: Player;
  room: Room = { id:'', room:'', players: []};
  private _roomSub: Subscription;
  constructor(private route: ActivatedRoute, private roomService: RoomService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('idRoom');
    this.player = new Player();
    window.console.log("what the f****", id);
    this._roomSub = this.roomService.currentRoom.pipe(
      startWith(this.room)
    ).subscribe(room => this.room = room);
    this.roomService.getRoom(id);
  }

  ngOnDestroy() {
    this._roomSub.unsubscribe();
  }

  chooseName() {
    let id = this.route.snapshot.paramMap.get('idRoom');
    console.log(this.room);
    this.player.score = 0;
    this.roomService.registerPlayer(id, this.player);
  }

  editRoom() {
    this.roomService.editRoom(this.room);
  }

}
