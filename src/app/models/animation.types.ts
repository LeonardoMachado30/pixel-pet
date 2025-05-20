export interface AnimationFrame {
  width: number;
  height: number;
  path: string;
}

export interface AnimationState {
  name: string;
  frames: AnimationFrame[];
  speed: number;
  scale?: number;
}

export interface AnimationConfig {
  states: AnimationState[];
  defaultState: string;
  autoPlayEnabled?: boolean;
  autoPlayDurations?: {
    min: number;
    max: number;
    [key: string]: number | undefined;
  };
}
