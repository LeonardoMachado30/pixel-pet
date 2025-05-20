import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseAnimationComponent } from '../base-animation/base-animation.component';
import { AnimationService } from '../../services/animation.service';
import { CharacterService } from '../../services/character.service';
import { catConfig } from './cat-animation.config';

@Component({
  selector: 'app-cat-animation',
  standalone: true,
  imports: [CommonModule, BaseAnimationComponent],
  templateUrl: './cat-animation.component.html',
  styleUrls: ['./cat-animation.component.scss'],
})
export class CatAnimationComponent {
  readonly catConfig = catConfig;

  constructor(
    private animationService: AnimationService,
    private characterService: CharacterService
  ) {}

  get isAutoPlaying() {
    return this.animationService.isAutoPlaying;
  }

  onSpriteClick(currentState: string) {
    if (currentState !== 'running') {
      this.characterService.takeDamage();
    }
  }

  takeDamage() {
    this.characterService.takeDamage(1);
  }

  playRunning() {
    this.animationService.setState('running');
  }

  playScratch() {
    this.animationService.setState('scratching');
  }

  playWallScratch() {
    this.animationService.setState('wallScratching');
  }

  playStop() {
    this.animationService.setState('stopped');
  }

  playSleep() {
    this.animationService.setState('sleeping');
  }

  playAlert() {
    this.animationService.setState('alert');
  }

  toggleAutoPlay() {
    this.animationService.toggleAutoPlay();
  }

  heal() {
    this.characterService.heal();
  }
}
