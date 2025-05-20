import { AnimationConfig } from './animation.types';
import { Signal } from '@angular/core';

export interface CharacterStats {
  maxLife: number;
  currentLife: number;
}

export abstract class Character {
  protected stats: CharacterStats;
  protected animationConfig: AnimationConfig;

  constructor(stats: CharacterStats, animationConfig: AnimationConfig) {
    this.stats = stats;
    this.animationConfig = animationConfig;
  }

  abstract onDamage(): void;
  abstract onHeal(): void;

  getStats(): CharacterStats {
    return this.stats;
  }

  getAnimationConfig(): AnimationConfig {
    return this.animationConfig;
  }

  takeDamage(amount: number = 1): void {
    this.stats.currentLife = Math.max(0, this.stats.currentLife - amount);
    this.onDamage();
  }

  heal(amount: number = 1): void {
    this.stats.currentLife = Math.min(
      this.stats.maxLife,
      this.stats.currentLife + amount
    );
    this.onHeal();
  }

  isDead(): boolean {
    return this.stats.currentLife <= 0;
  }
}
