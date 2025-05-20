import { Component, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-life',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './life.component.html',
  styleUrls: ['./life.component.scss'],
})
export class LifeComponent {
  constructor(private characterService: CharacterService) {
    // Monitor stats changes for debugging
    effect(() => {
      const hearts = this.hearts();
      console.log('Hearts updated:', hearts);
    });
  }

  hearts = computed(() => {
    const stats = this.characterService.getStats();
    console.log('Computing hearts with stats:', stats);

    if (!stats) return [];

    const currentLife = stats.currentLife;
    const maxLife = stats.maxLife;
    const halfLife = maxLife / 2;

    let heartColor = '';
    if (currentLife === maxLife) {
      heartColor = 'green';
    } else if (currentLife <= 1) {
      heartColor = 'red';
    } else {
      heartColor = 'yellow';
    }

    return Array(stats.maxLife)
      .fill(0)
      .map((_, index) => ({
        filled: index < stats.currentLife,
        color: index < stats.currentLife ? heartColor : '',
      }));
  });
}
