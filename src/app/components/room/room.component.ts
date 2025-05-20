import { Component } from '@angular/core';
import { CatAnimationComponent } from '../cat-animation/cat-animation.component';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CatAnimationComponent],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss',
})
export class RoomComponent {}
