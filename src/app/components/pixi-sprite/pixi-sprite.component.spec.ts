import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixiSpriteComponent } from './pixi-sprite.component';

describe('PixiSpriteComponent', () => {
  let component: PixiSpriteComponent;
  let fixture: ComponentFixture<PixiSpriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PixiSpriteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PixiSpriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
