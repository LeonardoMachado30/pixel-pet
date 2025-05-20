import { Injectable, signal, effect, DestroyRef, inject } from '@angular/core';
import { Character, CharacterStats } from '../models/character.types';
import { Cat } from '../models/cat.model';
import { AnimationService } from './animation.service';
import { catConfig } from '../components/cat-animation/cat-animation.config';
import { HealthService } from './health.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private currentCharacter = signal<Character | null>(null);
  private hungerTimer: any;
  private readonly HUNGER_INTERVAL = 30000; // 30 seconds

  constructor(
    private animationService: AnimationService,
    private healthService: HealthService,
    private destroyRef: DestroyRef
  ) {
    // Initialize with a cat character by default
    this.initializeCat();

    // Setup effect to monitor character's life
    effect(() => {
      const stats = this.healthService.getStats();
      if (stats) {
        console.log('Character life updated:', stats.currentLife);
      }
    });

    // Cleanup on destroy
    this.destroyRef.onDestroy(() => {
      this.stopHungerTimer();
    });
  }

  private initializeCat(): void {
    const initialStats = { maxLife: 4, currentLife: 4 };
    const cat = new Cat(this.animationService, initialStats, catConfig);
    this.currentCharacter.set(cat);
    this.healthService.updateStats(initialStats);

    // Start the hunger timer immediately after initializing the cat
    this.startHungerTimer();
  }

  private startHungerTimer(): void {
    console.log('Starting hunger timer...');
    this.stopHungerTimer(); // Clear any existing timer

    this.hungerTimer = setInterval(() => {
      const character = this.currentCharacter();
      if (character && !character.isDead()) {
        console.log('Taking damage from hunger...');
        this.takeDamage(1);

        // If character dies from hunger, stop the timer
        if (character.isDead()) {
          console.log('Character died from hunger!');
          this.stopHungerTimer();
        }
      }
    }, this.HUNGER_INTERVAL);
  }

  private stopHungerTimer(): void {
    if (this.hungerTimer) {
      clearInterval(this.hungerTimer);
      this.hungerTimer = null;
    }
  }

  private updateStats(): void {
    const character = this.currentCharacter();
    if (character) {
      const stats = character.getStats();
      console.log('Updating health stats:', stats);
      this.healthService.updateStats({ ...stats }); // Create new object to ensure signal triggers
    }
  }

  getCurrentCharacter(): Character | null {
    return this.currentCharacter();
  }

  takeDamage(amount: number = 1): void {
    const character = this.currentCharacter();
    if (character) {
      character.takeDamage(amount);
      this.updateStats(); // Ensure stats are updated after damage
      const currentStats = character.getStats();
      console.log(
        'Character took damage. Current life:',
        currentStats.currentLife,
        'Stats updated:',
        this.healthService.getStats()
      );
    }
  }

  feed(): boolean {
    const character = this.currentCharacter();
    if (!character || character.isDead()) return false;

    const stats = character.getStats();
    if (stats.currentLife >= stats.maxLife) return false;

    character.heal(1);
    this.updateStats(); // Ensure stats are updated after healing
    console.log(
      'Character was fed. Current life:',
      character.getStats().currentLife
    );

    // Reset hunger timer when fed
    this.startHungerTimer();

    // Inicia a sequência de animações após comer
    this.animationService.playEatingSequence();

    return true;
  }

  heal(amount: number = 1): void {
    const character = this.currentCharacter();
    if (character) {
      character.heal(amount);
      this.updateStats(); // Ensure stats are updated after healing
      console.log(
        'Character was healed. Current life:',
        character.getStats().currentLife
      );
    }
  }

  getStats(): CharacterStats | null {
    return this.healthService.getStats();
  }

  canFeed(): boolean {
    const stats = this.healthService.getStats();
    if (!stats || stats.currentLife <= 0) return false;
    return stats.currentLife < stats.maxLife;
  }
}
