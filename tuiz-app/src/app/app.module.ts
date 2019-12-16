import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomComponent } from './room/room.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SharedDisplayComponent } from './shared-display/shared-display.component';
import { PlayerListComponent } from './player-list/player-list.component';

const config: SocketIoConfig = { url: 'http://localhost:7400', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    RoomListComponent,
    RoomComponent,
    SharedDisplayComponent,
    PlayerListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
	  SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
