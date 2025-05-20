import { Injectable, signal, computed } from '@angular/core';
import { AnimationConfig } from '../models/animation.types';
import { HealthService } from './health.service';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  private config = signal<AnimationConfig | null>(null);
  private currentStateSignal = signal<string>('');
  private isAutoPlayingSignal = signal<boolean>(false);
  private animationTimeouts: number[] = [];
  private autoPlayInterval: any;
  private isPlayingSequence = false;

  currentState = computed(() => this.currentStateSignal());
  isAutoPlaying = computed(() => this.isAutoPlayingSignal());

  constructor(private healthService: HealthService) {}

  setConfig(config: AnimationConfig) {
    this.config.set(config);
    if (config.autoPlayEnabled) {
      this.startAutoPlay();
    }
  }

  getConfig(): AnimationConfig | null {
    return this.config();
  }

  setState(state: string) {
    // Se estiver em uma sequência, não permita mudanças de estado externas
    if (this.isPlayingSequence && state === 'running') {
      return;
    }
    this.currentStateSignal.set(state);
  }

  clearAllAnimations() {
    // Limpa todos os timeouts de animação
    this.animationTimeouts.forEach((timeout) => clearTimeout(timeout));
    this.animationTimeouts = [];

    // Para o autoplay se estiver ativo
    this.stopAutoPlay();
    this.isPlayingSequence = false;
  }

  private addAnimationTimeout(callback: () => void, delay: number): number {
    const timeoutId = window.setTimeout(() => {
      callback();
      // Remove o timeout da lista quando executado
      this.animationTimeouts = this.animationTimeouts.filter(
        (id) => id !== timeoutId
      );
    }, delay);
    this.animationTimeouts.push(timeoutId);
    return timeoutId;
  }

  startAutoPlay() {
    if (this.isPlayingSequence) return;
    this.stopAutoPlay();
    this.isAutoPlayingSignal.set(true);
    this.scheduleNextRandomAnimation();
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearTimeout(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
    this.isAutoPlayingSignal.set(false);
  }

  toggleAutoPlay() {
    if (this.isAutoPlaying()) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
  }

  private shouldShowAlert(): boolean {
    return this.healthService.isLowHealth();
  }

  private scheduleNextRandomAnimation() {
    const playNext = () => {
      if (this.isPlayingSequence) return;

      // Verifica se deve mostrar alerta
      if (this.shouldShowAlert()) {
        this.setState('alert');
      } else {
        const nextState = this.getRandomState();
        if (nextState !== this.currentState()) {
          this.setState(nextState);
        }
      }

      if (this.isAutoPlaying()) {
        const duration = this.getRandomDuration(this.currentState());
        this.autoPlayInterval = this.addAnimationTimeout(playNext, duration);
      }
    };

    this.addAnimationTimeout(playNext, 0);
  }

  getRandomState(excludeState?: string): string {
    const config = this.config();
    if (!config || !config.states.length) return '';

    const availableStates = config.states
      .map((s) => s.name)
      .filter(
        (name) =>
          name !== excludeState && name !== 'stopped' && name !== 'alert'
      );

    const randomIndex = Math.floor(Math.random() * availableStates.length);
    return availableStates[randomIndex];
  }

  getRandomDuration(state: string): number {
    const config = this.config();
    if (!config || !config.autoPlayDurations) return 5000;

    if (state === 'sleeping') {
      return config.autoPlayDurations['sleeping'] || 300000;
    }

    if (state === 'alert') {
      return config.autoPlayDurations['alert'] || 3000;
    }

    const min = config.autoPlayDurations['min'] || 5000;
    const max = config.autoPlayDurations['max'] || 20000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  playEatingSequence() {
    // Limpa todas as animações existentes
    this.clearAllAnimations();
    this.isPlayingSequence = true;

    // Salva o estado do autoplay
    const wasAutoPlaying = this.isAutoPlaying();

    // Escolhe aleatoriamente entre scratch e wall-scratching
    const scratchAnimation =
      Math.random() < 0.5 ? 'scratching' : 'wallScratching';

    // Primeira animação: scratch ou wall-scratching
    this.setState(scratchAnimation);

    // Após a animação de scratch, escolhe uma animação aleatória
    this.addAnimationTimeout(() => {
      const nextAnimation = this.getRandomState(scratchAnimation);
      this.setState(nextAnimation);

      // Reativa o autoplay se estava ativo antes
      this.addAnimationTimeout(() => {
        this.isPlayingSequence = false;
        if (wasAutoPlaying) {
          this.startAutoPlay();
        }
      }, 2000);
    }, 2000);
  }
}
