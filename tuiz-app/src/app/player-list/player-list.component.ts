import { Component, Input } from '@angular/core';
import { Room } from '../models/room';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent {

  @Input() room: Room;

  constructor() { }

}
