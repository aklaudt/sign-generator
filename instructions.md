# Disc Golf Tee Sign Generator - Project Instructions

## Project Overview

Build a web application that allows users to upload GPS/satellite images of disc golf holes, add markup for tee pads and basket positions,
and export professional tee signs with course information.

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
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
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

### 3. Documentation

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

## Success Criteria

- [ ] Can upload image
- [ ] Can place and drag tee pad marker
- [ ] Can place and drag 1-3 basket markers
- [ ] Can input course information
- [ ] Can export high-quality PNG
- [ ] All tests pass with >80% coverage
- [ ] Responsive design works on desktop
- [ ] No accessibility violations
- [ ] Documentation complete
- [ ] Code follows style guide

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
