import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Input,
  effect,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Application, Assets, Texture, AnimatedSprite } from 'pixi.js';
import { AnimationConfig } from '../../models/animation.types';
import { AnimationService } from '../../services/animation.service';
import { CharacterService } from '../../services/character.service';
import { FoodComponent } from '../food/food.component';
import { LifeComponent } from '../life/life.component';

@Component({
  selector: 'app-base-animation',
  standalone: true,
  imports: [CommonModule, FoodComponent, LifeComponent],
  templateUrl: './base-animation.component.html',
  styleUrls: ['./base-animation.component.scss'],
})
export class BaseAnimationComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container') container!: ElementRef;
  @Input() showControls = true;
  @Input() set config(value: AnimationConfig) {
    this.animationService.setConfig(value);
  }
  @Output() spriteClick = new EventEmitter<string>();

  protected app!: Application;
  protected sprite!: AnimatedSprite;
  protected textures: { [key: string]: Texture[] } = {};
  private currentState: string = '';
  private dropPending = false;

  constructor(
    protected animationService: AnimationService,
    protected characterService: CharacterService
  ) {
    // Setup effects for state changes
    effect(() => {
      const state = this.animationService.currentState();
      if (state && state !== this.currentState) {
        this.currentState = state;
        this.playAnimation(state);
      }
    });
  }

  ngOnDestroy() {
    if (this.app) {
      this.app.destroy(true);
    }
  }

  onDragOver(event: DragEvent) {
    if (this.characterService.canFeed()) {
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }
      this.dropPending = true;
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (
      event.dataTransfer?.getData('text/plain') === 'food' &&
      this.dropPending
    ) {
      this.characterService.feed();
      this.dropPending = false;
    }
  }

  async ngAfterViewInit() {
    await this.initPixi();
    await this.loadTextures();
    this.createSprite();
  }

  protected async initPixi() {
    this.app = new Application({
      width: window.innerWidth,
      height: window.innerHeight - 100,
      background: '#3494c4',
    });

    this.container.nativeElement.appendChild(
      this.app.view as HTMLCanvasElement
    );
    window.addEventListener('resize', this.onResize.bind(this));
  }

  protected async loadTextures() {
    const config = this.animationService.getConfig();
    if (!config) return;

    try {
      for (const state of config.states) {
        this.textures[state.name] = [];
        for (const frame of state.frames) {
          const texture = await Assets.load(frame.path);
          this.textures[state.name].push(texture);
        }
      }
    } catch (error) {
      console.error('Error loading textures:', error);
    }
  }

  protected createSprite() {
    const config = this.animationService.getConfig();
    if (!config) return;

    const defaultState = config.states.find(
      (s) => s.name === config.defaultState
    );
    if (!defaultState || !this.textures[defaultState.name].length) return;

    this.sprite = new AnimatedSprite(this.textures[defaultState.name]);
    this.sprite.anchor.set(0.5);
    this.sprite.eventMode = 'static';
    this.sprite.cursor = `url('/assets/cursor-pointer.png') 0 0, pointer`;
    this.sprite.on('pointerdown', () => {
      this.spriteClick.emit(this.currentState);
    });
    this.app.stage.addChild(this.sprite);
    this.onResize();
  }

  protected playAnimation(stateName: string) {
    if (!this.sprite) return;

    const config = this.animationService.getConfig();
    if (!config) return;

    const state = config.states.find((s) => s.name === stateName);
    if (!state || !this.textures[state.name]) return;

    this.sprite.textures = this.textures[state.name];
    this.sprite.animationSpeed = state.speed;

    if (state.scale !== undefined) {
      this.sprite.scale.set(state.scale);
    }

    this.sprite.play();
  }

  protected onResize() {
    if (!this.sprite || !this.app) return;

    this.sprite.position.set(
      this.app.screen.width / 2,
      this.app.screen.height / 2
    );
  }
}
