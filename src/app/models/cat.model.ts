import { Character, CharacterStats } from './character.types';
import { AnimationConfig } from './animation.types';
import { AnimationService } from '../services/animation.service';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cat extends Character {
  private alertTimeout: any;

  constructor(
    private animationService: AnimationService,
    @Inject('CHARACTER_STATS')
    stats: CharacterStats = { maxLife: 4, currentLife: 4 },
    @Inject('ANIMATION_CONFIG')
    animationConfig: AnimationConfig
  ) {
    super(stats, animationConfig);
  }

  onDamage(): void {
    // Clear any existing timeout
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }

    // Show alert animation
    this.animationService.setState('alert');

    // Return to default state after 1 second
    this.alertTimeout = setTimeout(() => {
      this.animationService.setState(this.animationConfig.defaultState);
    }, 1000);
  }

  onHeal(): void {
    // When healed, show happy animation (if we add one later)
    // For now, just return to default state
    this.animationService.setState(this.animationConfig.defaultState);
  }

  override takeDamage(amount: number = 1): void {
    super.takeDamage(amount);
    this.onDamage();
  }
}
