import { Component } from '@angular/core';
import { RoomComponent } from './components/room/room.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RoomComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pixel-pet';
}
