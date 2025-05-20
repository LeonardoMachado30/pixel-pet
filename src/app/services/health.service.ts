import { Injectable, signal } from '@angular/core';
import { CharacterStats } from '../models/character.types';

@Injectable({
  providedIn: 'root',
})
export class HealthService {
  private healthStats = signal<CharacterStats | null>(null);

  updateStats(stats: CharacterStats) {
    this.healthStats.set(stats);
  }

  getStats(): CharacterStats | null {
    return this.healthStats();
  }

  isLowHealth(): boolean {
    const stats = this.healthStats();
    if (!stats) return false;
    return stats.currentLife <= stats.maxLife / 2;
  }
}
