import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Room } from '../models/room';
import { RoomService } from '../room.service';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';


import * as QRCode from 'easyqrcodejs';

@Component({
  selector: 'app-shared-display',
  templateUrl: './shared-display.component.html',
  styleUrls: ['./shared-display.component.scss']
})
export class SharedDisplayComponent implements OnInit {

  @ViewChild('qrcode', { static: false }) qrcodeEl: ElementRef;

  qrcodeDrawed: boolean = false;
  room: Room = { id: '', question: {}, players: [] };
  linkToRoom: string;
  private _roomSub: Subscription;
  constructor(private roomService: RoomService) { }

  ngOnInit() {

    this._roomSub = this.roomService.currentRoom.pipe(
      startWith(this.room)
    ).subscribe(room => {
      console.log(this);
      this.room = room;
      this.linkToRoom = window.location.href + "quiz/" + room.id;
      let options = { text: this.linkToRoom };
      if (room.id && !this.qrcodeDrawed) {
        new QRCode(this.qrcodeEl.nativeElement, options);
        this.qrcodeDrawed = true;
      }
    });
    this.roomService.newRoom();
  }

  ngOnDestroy() {
    this._roomSub.unsubscribe();
  }

  editRoom() {
    this.roomService.editRoom(this.room);
  }

  nextQuestion() {
    this.roomService.nextQuestion(this.room.id);
  }

  openTab() {
    window.open(
      this.linkToRoom,
      '_blank'
    );
  }

}
