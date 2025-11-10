# Disc Golf Tee Sign Generator

A web application for creating professional tee signs for disc golf courses.

## Features

- Upload satellite/GPS images of disc golf holes
- Interactive markup interface for placing tee pads and baskets
- Support for 1-3 basket configurations per hole
- Course information input (hole number, par, distance)
- Export high-resolution PNG tee signs

## Tech Stack

- React 18+ with TypeScript
- Vite
- TailwindCSS
- Zustand for state management
- html2canvas for image export
- react-draggable for interactive markers
- Vitest + React Testing Library for testing

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Testing

Run tests:

```bash
npm test
```

Run tests with UI:

```bash
npm run test:ui
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Code Quality

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## Project Structure

```
src/
├── components/       # React components
├── store/           # Zustand store
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── hooks/           # Custom React hooks
├── App.tsx          # Main app component
└── main.tsx         # Application entry point
```

## Contributing

1. Follow the ESLint and Prettier configurations
2. Maintain >80% test coverage
3. Write tests for all new features
4. Use TypeScript strict mode

## License

MIT
