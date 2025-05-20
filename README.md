# Pixel Pet - Interactive Cat Animation

A delightful Angular application featuring an interactive animated cat using PixiJS and NgXs state management.

## Features

- Smooth sprite-based cat animations
- Multiple animation states:
  - Running (138x100 pixels, 8 frames)
  - Scratching (97x100 pixels, 6 frames)
  - Sleeping (150x100 pixels, 2 frames)
  - Idle/Stop state
- Automatic random animation transitions
- Manual animation controls
- Responsive design that adapts to window size

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v19.2.0 or higher)

## Installation

1. Clone the repository:

```bash
git clone [your-repository-url]
cd pixel-pet
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── cat-animation/      # Cat animation component
│   ├── store/
│   │   └── cat-animation/      # NgXs state management
│   └── assets/
│       └── cat/               # Sprite assets
│           ├── running/       # Running animation frames
│           ├── scratching/    # Scratching animation frames
│           └── sleeping/      # Sleeping animation frames
```

## Animation Details

- Running Animation:

  - 8 frames at 138x100 pixels
  - Animation speed: 0.2
  - Random duration: 5-20 seconds

- Scratching Animation:

  - 6 frames at 97x100 pixels
  - Animation speed: 0.15
  - Random duration: 5-20 seconds

- Sleeping Animation:
  - 2 frames at 150x100 pixels
  - Animation speed: 0.1
  - Random duration: 1-5 minutes

## State Management

The application uses NgXs for state management with the following actions:

- PlayRunningAnimation
- PlayScratchingAnimation
- PlayStopAnimation
- PlaySleepingAnimation
- StartRandomAnimation
- StopAutoPlay

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
