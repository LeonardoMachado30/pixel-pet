import { Component, computed, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../../services/character.service';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
})
export class FoodComponent implements OnDestroy {
  private dragStyle?: HTMLStyleElement;
  private dragCleanupTimeout?: number;

  constructor(
    private characterService: CharacterService,
    private animationService: AnimationService
  ) {}

  canFeed = computed(() => this.characterService.canFeed());

  onDragStart(event: DragEvent) {
    if (!this.canFeed()) {
      event.preventDefault();
      return;
    }

    // Set cat to stop state
    this.animationService.setState('stopped');

    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', 'food');
      event.dataTransfer.effectAllowed = 'move';

      // Create a larger drag image
      const dragIcon = document.createElement('div');
      dragIcon.textContent = '🍗';
      dragIcon.style.fontSize = '48px';
      dragIcon.style.opacity = '0.9';
      dragIcon.style.transform = 'scale(1.2)';
      dragIcon.style.filter = 'drop-shadow(0 0 5px rgba(0,0,0,0.3))';
      dragIcon.style.cursor = 'grab';

      document.body.appendChild(dragIcon);
      event.dataTransfer.setDragImage(dragIcon, 24, 24);
      setTimeout(() => document.body.removeChild(dragIcon), 0);
    }

    // Ensure cursor stays as pointer during drag
    this.dragStyle = document.createElement('style');
    this.dragStyle.textContent = `* { cursor: grab !important; }`;
    document.head.appendChild(this.dragStyle);

    // Setup drag end cleanup
    document.addEventListener('dragend', this.onDragEnd);
  }

  private onDragEnd = () => {
    this.cleanup();

    // Return to default state after a short delay to ensure drop handler finished
    this.dragCleanupTimeout = window.setTimeout(() => {
      const config = this.animationService.getConfig();
      if (config) {
        this.animationService.setState(config.defaultState);
      }
    }, 100);
  };

  private cleanup() {
    // Remove global cursor style
    if (this.dragStyle && document.head.contains(this.dragStyle)) {
      document.head.removeChild(this.dragStyle);
      this.dragStyle = undefined;
    }

    // Remove event listener
    document.removeEventListener('dragend', this.onDragEnd);

    // Clear any pending timeouts
    if (this.dragCleanupTimeout) {
      clearTimeout(this.dragCleanupTimeout);
      this.dragCleanupTimeout = undefined;
    }
  }

  ngOnDestroy() {
    this.cleanup();
  }
}
