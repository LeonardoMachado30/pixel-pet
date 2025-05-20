import { AnimationConfig } from '../../models/animation.types';

export const catConfig: AnimationConfig = {
  states: [
    {
      name: 'running',
      frames: [
        {
          width: 138,
          height: 100,
          path: 'assets/cat/resized/running/frame1.png',
        },
        {
          width: 138,
          height: 100,
          path: 'assets/cat/resized/running/frame2.png',
        },
      ],
      speed: 0.1,
    },
    {
      name: 'scratching',
      frames: [
        {
          width: 194,
          height: 200,
          path: 'assets/cat/resized/scratching/frame1.png',
        },
        {
          width: 194,
          height: 200,
          path: 'assets/cat/resized/scratching/frame2.png',
        },
      ],
      speed: 0.15,
    },
    {
      name: 'wallScratching',
      frames: [
        {
          width: 300,
          height: 330,
          path: 'assets/cat/resized/wall-scratching/frame1.png',
        },
        {
          width: 300,
          height: 330,
          path: 'assets/cat/resized/wall-scratching/frame2.png',
        },
      ],
      speed: 0.075,
      scale: 0.8,
    },
    {
      name: 'sleeping',
      frames: [
        {
          width: 300,
          height: 200,
          path: 'assets/cat/resized/sleeping/frame1.png',
        },
        {
          width: 300,
          height: 200,
          path: 'assets/cat/resized/sleeping/frame2.png',
        },
      ],
      speed: 0.025,
    },
    {
      name: 'stopped',
      frames: [
        { width: 200, height: 240, path: 'assets/cat/resized/stop.png' },
      ],
      speed: 0,
    },
    {
      name: 'alert',
      frames: [
        { width: 198, height: 220, path: 'assets/cat/resized/cat-alert.png' },
      ],
      speed: 0,
    },
  ],
  defaultState: 'running',
  autoPlayEnabled: true,
  autoPlayDurations: {
    min: 5000,
    max: 20000,
    sleeping: 300000, // 5 minutes
  },
};
