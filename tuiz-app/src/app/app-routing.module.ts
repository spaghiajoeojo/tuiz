import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedDisplayComponent } from './shared-display/shared-display.component';
import { RoomComponent } from './room/room.component';


const routes: Routes = [
  { path: "", component: SharedDisplayComponent },
  { path: "quiz/:idRoom", component: RoomComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
