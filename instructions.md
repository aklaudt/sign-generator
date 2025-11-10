# Disc Golf Tee Sign Generator - Project Instructions

## Project Overview

Build a web application that allows users to upload GPS/satellite images of disc golf holes, add markup for tee pads and basket positions, and export professional tee signs with course information.

## Core Features

### 1. Image Upload & Display
- Users can upload satellite/GPS images of disc golf holes
- Display uploaded image in an interactive canvas/container

### 2. Interactive Markup Interface
- Click to place tee pad icon (green marker)
- Click to place basket icons (red, white, blue for different positions)
- Support for 1, 2, or 3 basket configurations per hole
- Draggable icons after placement for repositioning
- Delete/remove placed icons

### 3. Course Information Form
- Hole number input
- Dynamic form that adjusts based on number of baskets selected
- For each basket position:
  - Par (dropdown: 3, 4, 5)
  - Distance in feet (number input)
- Basket position labels: Red (Short/A), White (Medium/B), Blue (Long/C)

### 4. Tee Sign Generation & Export
- Combine satellite image, icons, and course data into formatted tee sign
- Export as high-resolution PNG using html2canvas
- Tee sign layout includes:
  - Header with hole number
  - Course information for all active baskets
  - Satellite image with placed markers
  - Legend showing basket colors and tee pad

## Tech Stack

### Frontend Framework
- **React 18+** with TypeScript
- **Vite** for build tooling and dev server

### UI Libraries
- **TailwindCSS** for styling
- **shadcn/ui** or **Radix UI** for component primitives (optional but recommended)
- **Lucide React** for icons

### Core Dependencies
- **html2canvas** (^1.4.1) - For exporting tee signs as PNG
- **react-draggable** (^4.4.6) - For draggable icon functionality
- **zustand** (^4.5.0) or **Redux Toolkit** - State management

### Development Tools
- **TypeScript** (^5.0.0)
- **ESLint** with TypeScript plugins
- **Prettier** for code formatting

### Testing Stack
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing
- **@testing-library/user-event** - User interaction simulation
- **@testing-library/jest-dom** - Custom matchers
- **MSW (Mock Service Worker)** - API mocking if needed

## Project Structure

```
disc-golf-tee-sign-generator/
├── src/
│   ├── components/
│   │   ├── ImageUploader/
│   │   │   ├── ImageUploader.tsx
│   │   │   ├── ImageUploader.test.tsx
│   │   │   └── index.ts
│   │   ├── MapCanvas/
│   │   │   ├── MapCanvas.tsx
│   │   │   ├── MapCanvas.test.tsx
│   │   │   ├── DraggableMarker.tsx
│   │   │   ├── DraggableMarker.test.tsx
│   │   │   └── index.ts
│   │   ├── CourseInfoForm/
│   │   │   ├── CourseInfoForm.tsx
│   │   │   ├── CourseInfoForm.test.tsx
│   │   │   ├── BasketInput.tsx
│   │   │   └── index.ts
│   │   ├── TeeSignPreview/
│   │   │   ├── TeeSignPreview.tsx
│   │   │   ├── TeeSignPreview.test.tsx
│   │   │   └── index.ts
│   │   └── ExportButton/
│   │       ├── ExportButton.tsx
│   │       ├── ExportButton.test.tsx
│   │       └── index.ts
│   ├── store/
│   │   ├── teeSignStore.ts
│   │   └── teeSignStore.test.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── exportTeeSign.ts
│   │   ├── exportTeeSign.test.ts
│   │   ├── validation.ts
│   │   └── validation.test.ts
│   ├── hooks/
│   │   ├── useImageUpload.ts
│   │   ├── useImageUpload.test.ts
│   │   └── useTeeSignExport.ts
│   ├── App.tsx
│   ├── App.test.tsx
│   ├── main.tsx
│   └── index.css
├── public/
│   └── icons/
├── tests/
│   └── setup.ts
├── .eslintrc.cjs
├── .prettierrc
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── package.json
└── README.md
```

## Type Definitions

```typescript
// src/types/index.ts

export type BasketPosition = 'red' | 'white' | 'blue';

export interface Coordinate {
  x: number;
  y: number;
}

export interface BasketData {
  position: BasketPosition;
  par: 3 | 4 | 5;
  distance: number;
  coordinates: Coordinate;
}

export interface TeePadData {
  coordinates: Coordinate;
}

export interface TeeSignData {
  holeNumber: number;
  image: string | null; // base64 or URL
  teePad: TeePadData | null;
  baskets: BasketData[];
  activeBasketCount: 1 | 2 | 3;
}

export interface MarkerProps {
  type: 'teePad' | 'basket';
  position?: BasketPosition;
  coordinates: Coordinate;
  onDrag: (newCoordinates: Coordinate) => void;
  onDelete: () => void;
}
```

## State Management (Zustand Example)

```typescript
// src/store/teeSignStore.ts

import { create } from 'zustand';
import { TeeSignData, BasketData, Coordinate } from '../types';

interface TeeSignStore extends TeeSignData {
  setImage: (image: string) => void;
  setHoleNumber: (number: number) => void;
  setActiveBasketCount: (count: 1 | 2 | 3) => void;
  setTeePad: (coordinates: Coordinate) => void;
  addBasket: (basket: BasketData) => void;
  updateBasket: (position: BasketPosition, updates: Partial<BasketData>) => void;
  removeBasket: (position: BasketPosition) => void;
  reset: () => void;
}

const initialState: TeeSignData = {
  holeNumber: 1,
  image: null,
  teePad: null,
  baskets: [],
  activeBasketCount: 1,
};

export const useTeeSignStore = create<TeeSignStore>((set) => ({
  ...initialState,
  
  setImage: (image) => set({ image }),
  
  setHoleNumber: (holeNumber) => set({ holeNumber }),
  
  setActiveBasketCount: (activeBasketCount) => set({ activeBasketCount }),
  
  setTeePad: (coordinates) => set({ teePad: { coordinates } }),
  
  addBasket: (basket) => set((state) => ({
    baskets: [...state.baskets, basket]
  })),
  
  updateBasket: (position, updates) => set((state) => ({
    baskets: state.baskets.map(b => 
      b.position === position ? { ...b, ...updates } : b
    )
  })),
  
  removeBasket: (position) => set((state) => ({
    baskets: state.baskets.filter(b => b.position !== position)
  })),
  
  reset: () => set(initialState),
}));
```

## Component Implementation Guidelines

### ImageUploader Component
```typescript
// src/components/ImageUploader/ImageUploader.tsx

interface ImageUploaderProps {
  onImageUpload: (imageData: string) => void;
}

// Features:
// - File input with drag-and-drop support
// - Preview uploaded image
// - Validate file type (jpg, png, webp)
// - Validate file size (< 10MB)
// - Display error messages
// - Convert to base64 for storage
```

### MapCanvas Component
```typescript
// src/components/MapCanvas/MapCanvas.tsx

interface MapCanvasProps {
  imageUrl: string;
  teePad: Coordinate | null;
  baskets: BasketData[];
  onTeePadPlace: (coordinates: Coordinate) => void;
  onBasketPlace: (basket: BasketData) => void;
  activeBasketCount: 1 | 2 | 3;
}

// Features:
// - Display satellite image
// - Click to place tee pad (only one allowed)
// - Click to place baskets (based on activeBasketCount)
// - Render all placed markers
// - Calculate click coordinates relative to image
// - Show visual feedback for placement mode
```

### DraggableMarker Component
```typescript
// src/components/MapCanvas/DraggableMarker.tsx

// Features:
// - Render appropriate icon based on type and position
// - Draggable functionality
// - Delete button on hover/selection
// - Constrain dragging within image bounds
// - Visual styling with CSS (colors, shadows, borders)
```

### CourseInfoForm Component
```typescript
// src/components/CourseInfoForm/CourseInfoForm.tsx

// Features:
// - Hole number input
// - Basket count selector (1, 2, or 3)
// - Dynamic basket input fields based on count
// - Par dropdown for each basket
// - Distance input for each basket
// - Form validation
// - Real-time updates to store
```

### TeeSignPreview Component
```typescript
// src/components/TeeSignPreview/TeeSignPreview.tsx

// Features:
// - Display formatted tee sign layout
// - Header with hole number
// - Course info section (par and distance for each basket)
// - Satellite image with markers
// - Legend at bottom
// - Styled with TailwindCSS for professional appearance
// - This is the element that will be passed to html2canvas
```

### ExportButton Component
```typescript
// src/components/ExportButton/ExportButton.tsx

// Features:
// - Trigger export process
// - Use html2canvas to capture TeeSignPreview
// - Download resulting PNG
// - Loading state during export
// - Error handling
// - Validate all required data present before export
```

## Professional Coding Standards

### 1. Code Quality

#### TypeScript
- Use strict mode in tsconfig.json
- No `any` types - use proper typing or `unknown`
- Define interfaces for all props and data structures
- Use discriminated unions where appropriate

#### ESLint Configuration
```javascript
// .eslintrc.cjs
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off'
  }
};
```

#### Prettier Configuration
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

### 2. Testing Requirements

#### Unit Test Coverage
- Minimum 80% code coverage
- Test all utility functions
- Test all custom hooks
- Test store actions and state changes

#### Component Testing
- Test user interactions
- Test conditional rendering
- Test prop variations
- Test error states
- Test loading states

#### Example Test Structure
```typescript
// src/components/ImageUploader/ImageUploader.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageUploader } from './ImageUploader';

describe('ImageUploader', () => {
  it('renders upload button', () => {
    render(<ImageUploader onImageUpload={vi.fn()} />);
    expect(screen.getByText(/upload/i)).toBeInTheDocument();
  });

  it('calls onImageUpload when valid image is selected', async () => {
    const mockOnUpload = vi.fn();
    render(<ImageUploader onImageUpload={mockOnUpload} />);
    
    const file = new File(['image'], 'test.png', { type: 'image/png' });
    const input = screen.getByLabelText(/upload/i);
    
    await userEvent.upload(input, file);
    
    expect(mockOnUpload).toHaveBeenCalled();
  });

  it('displays error for invalid file type', async () => {
    render(<ImageUploader onImageUpload={vi.fn()} />);
    
    const file = new File(['doc'], 'test.pdf', { type: 'application/pdf' });
    const input = screen.getByLabelText(/upload/i);
    
    await userEvent.upload(input, file);
    
    expect(screen.getByText(/invalid file type/i)).toBeInTheDocument();
  });

  it('displays error for file size exceeding limit', async () => {
    render(<ImageUploader onImageUpload={vi.fn()} />);
    
    // Create file > 10MB
    const largeFile = new File(['x'.repeat(11 * 1024 * 1024)], 'large.png', {
      type: 'image/png'
    });
    const input = screen.getByLabelText(/upload/i);
    
    await userEvent.upload(input, largeFile);
    
    expect(screen.getByText(/file too large/i)).toBeInTheDocument();
  });
});
```

#### Store Testing
```typescript
// src/store/teeSignStore.test.ts

import { describe, it, expect, beforeEach } from 'vitest';
import { useTeeSignStore } from './teeSignStore';

describe('TeeSignStore', () => {
  beforeEach(() => {
    useTeeSignStore.getState().reset();
  });

  it('initializes with default state', () => {
    const state = useTeeSignStore.getState();
    expect(state.holeNumber).toBe(1);
    expect(state.baskets).toEqual([]);
    expect(state.teePad).toBeNull();
  });

  it('updates hole number', () => {
    useTeeSignStore.getState().setHoleNumber(5);
    expect(useTeeSignStore.getState().holeNumber).toBe(5);
  });

  it('adds basket correctly', () => {
    const basket = {
      position: 'red' as const,
      par: 3 as const,
      distance: 250,
      coordinates: { x: 100, y: 200 }
    };
    
    useTeeSignStore.getState().addBasket(basket);
    expect(useTeeSignStore.getState().baskets).toHaveLength(1);
    expect(useTeeSignStore.getState().baskets[0]).toEqual(basket);
  });

  it('updates basket data', () => {
    // Add basket first
    useTeeSignStore.getState().addBasket({
      position: 'red',
      par: 3,
      distance: 250,
      coordinates: { x: 100, y: 200 }
    });
    
    // Update it
    useTeeSignStore.getState().updateBasket('red', { distance: 300 });
    
    const basket = useTeeSignStore.getState().baskets[0];
    expect(basket.distance).toBe(300);
  });

  it('removes basket', () => {
    useTeeSignStore.getState().addBasket({
      position: 'red',
      par: 3,
      distance: 250,
      coordinates: { x: 100, y: 200 }
    });
    
    useTeeSignStore.getState().removeBasket('red');
    expect(useTeeSignStore.getState().baskets).toHaveLength(0);
  });
});
```

### 3. Documentation

#### Code Comments
- Use JSDoc comments for all exported functions and components
- Document complex algorithms or business logic
- Explain "why" not "what" in comments

#### README.md
Include:
- Project description
- Features list
- Installation instructions
- Development workflow
- Testing instructions
- Build and deployment
- Environment variables (if any)
- Contributing guidelines

#### Component Documentation
```typescript
/**
 * ImageUploader Component
 * 
 * Allows users to upload satellite images of disc golf holes.
 * Supports drag-and-drop and file input selection.
 * 
 * @param {ImageUploaderProps} props - Component props
 * @param {Function} props.onImageUpload - Callback when image is successfully uploaded
 * 
 * @example
 * <ImageUploader onImageUpload={(imageData) => console.log(imageData)} />
 */
export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  // Implementation
};
```

### 4. Git Workflow

#### Branch Strategy
- `main` - production-ready code
- `develop` - integration branch
- `feature/*` - feature branches
- `bugfix/*` - bug fix branches

#### Commit Messages
Follow conventional commits:
```
feat: add basket dragging functionality
fix: correct coordinate calculation on image resize
test: add unit tests for CourseInfoForm
docs: update README with installation instructions
refactor: extract validation logic to utils
```

#### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] Coverage maintained/improved

## Screenshots (if applicable)
```

### 5. Accessibility

- Use semantic HTML elements
- Include ARIA labels where needed
- Ensure keyboard navigation works
- Maintain color contrast ratios (WCAG AA)
- Test with screen readers
- Add alt text for images

### 6. Performance

- Lazy load components where appropriate
- Memoize expensive calculations
- Optimize image handling (compress, lazy load)
- Use React.memo for pure components
- Debounce form inputs
- Optimize html2canvas export (use appropriate scale)

### 7. Error Handling

```typescript
// src/utils/validation.ts

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateImage = (file: File): void => {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!validTypes.includes(file.type)) {
    throw new ValidationError('Invalid file type. Please upload JPG, PNG, or WebP.');
  }

  if (file.size > maxSize) {
    throw new ValidationError('File size exceeds 10MB limit.');
  }
};

export const validateTeeSignData = (data: TeeSignData): void => {
  if (!data.image) {
    throw new ValidationError('No image uploaded.');
  }

  if (!data.teePad) {
    throw new ValidationError('Tee pad position not set.');
  }

  if (data.baskets.length !== data.activeBasketCount) {
    throw new ValidationError(
      `Expected ${data.activeBasketCount} basket(s), but found ${data.baskets.length}.`
    );
  }

  data.baskets.forEach((basket) => {
    if (basket.distance <= 0) {
      throw new ValidationError('Distance must be greater than 0.');
    }
  });
};
```

## Export Functionality

```typescript
// src/utils/exportTeeSign.ts

import html2canvas from 'html2canvas';

export interface ExportOptions {
  scale?: number;
  backgroundColor?: string;
  quality?: number;
}

export const exportTeeSign = async (
  element: HTMLElement,
  filename: string = 'tee-sign.png',
  options: ExportOptions = {}
): Promise<void> => {
  const {
    scale = 2,
    backgroundColor = '#ffffff',
    quality = 0.95
  } = options;

  try {
    const canvas = await html2canvas(element, {
      scale,
      backgroundColor,
      useCORS: true,
      logging: false,
    });

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          throw new Error('Failed to create image blob');
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = filename;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      },
      'image/png',
      quality
    );
  } catch (error) {
    console.error('Export failed:', error);
    throw new Error('Failed to export tee sign. Please try again.');
  }
};
```

## CSS Styling Guidelines

### TailwindCSS Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'basket-red': '#EF4444',
        'basket-white': '#F3F4F6',
        'basket-blue': '#3B82F6',
        'tee-pad': '#10B981',
      },
    },
  },
  plugins: [],
};
```

### Example Component Styles
```typescript
// Tee Sign Preview styling
<div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
  {/* Header */}
  <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
    <h1 className="text-4xl font-bold">HOLE #{holeNumber}</h1>
    <div className="mt-4 space-y-2">
      {baskets.map(basket => (
        <div key={basket.position} className="flex items-center gap-2">
          <span className={`w-4 h-4 rounded-full bg-basket-${basket.position}`} />
          <span className="font-semibold capitalize">{basket.position}:</span>
          <span>Par {basket.par} - {basket.distance} ft</span>
        </div>
      ))}
    </div>
  </div>

  {/* Map Section */}
  <div className="relative">
    <img src={image} alt="Hole layout" className="w-full" />
    {/* Markers positioned absolutely */}
  </div>

  {/* Legend */}
  <div className="bg-gray-100 p-4 border-t">
    <div className="flex gap-6 justify-center">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-tee-pad rounded-full" />
        <span>Tee Pad</span>
      </div>
      {/* Basket legends */}
    </div>
  </div>
</div>
```

## Development Workflow

### Setup
```bash
npm create vite@latest disc-golf-tee-signs -- --template react-ts
cd disc-golf-tee-signs
npm install
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install html2canvas react-draggable zustand
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install lucide-react
```

### Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "type-check": "tsc --noEmit"
  }
}
```

### CI/CD Checklist
- [ ] Linting passes
- [ ] Type checking passes
- [ ] All tests pass
- [ ] Coverage threshold met (80%)
- [ ] Build succeeds
- [ ] No console errors or warnings

## Deployment Considerations

### Build Optimization
- Enable code splitting
- Optimize images
- Minify CSS and JS
- Use production build

### Hosting Options
- Vercel (recommended for Vite + React)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Environment Variables
```env
VITE_APP_NAME="Disc Golf Tee Sign Generator"
VITE_MAX_IMAGE_SIZE=10485760
```

## Future Enhancements (Post-MVP)

1. **Additional Markers**
   - Trees, water hazards, OB lines
   - Mandatory paths

2. **Template System**
   - Multiple tee sign templates
   - Customizable colors and fonts

3. **Multi-hole Course Management**
   - Save entire courses
   - Batch export all holes

4. **Cloud Storage**
   - Save and load projects
   - Share tee signs with others

5. **Advanced Styling**
   - Comic/cartoon style filters
   - Custom icon uploads

6. **Print-ready Export**
   - PDF export with proper sizing
   - Print templates (8.5x11, 11x17)

## Success Criteria

- [ ] Can upload satellite image
- [ ] Can place and drag tee pad marker
- [ ] Can place and drag 1-3 basket markers
- [ ] Can input course information
- [ ] Can export high-quality PNG
- [ ] All tests pass with >80% coverage
- [ ] Responsive design works on desktop
- [ ] No accessibility violations
- [ ] Documentation complete
- [ ] Code follows style guide

## Timeline Estimate

- **Week 1**: Project setup, basic image upload and display
- **Week 2**: Marker placement and dragging functionality
- **Week 3**: Course info form and state management
- **Week 4**: Tee sign preview and export functionality
- **Week 5**: Testing, bug fixes, documentation
- **Week 6**: Polish, accessibility, deployment

---

## Notes for LLM Implementation

When implementing this project:
1. Start with project setup and type definitions
2. Implement state management first
3. Build components incrementally with tests
4. Test each component thoroughly before moving to next
5. Integrate components gradually
6. Add styling after functionality works
7. Optimize and refine export quality
8. Write comprehensive documentation

Focus on:
- Type safety
- Test coverage
- Clean, readable code
- Proper error handling
- Accessibility
- Performance

Remember: Build incrementally, test thoroughly, document clearly.
