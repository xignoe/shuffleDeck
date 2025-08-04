# 🃏 Shuffle Deck Visualization

An interactive web application that demonstrates and visualizes different card shuffling algorithms with step-by-step animations, statistics tracking, and comprehensive accessibility features.

![Shuffle Deck Demo](https://img.shields.io/badge/Demo-Live-brightgreen) ![React](https://img.shields.io/badge/React-18+-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue) ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animations-purple)

## ✨ Features

### 🎯 Core Functionality
- **4 Shuffle Algorithms**: Fisher-Yates, Riffle Shuffle, Overhand Shuffle, and Hindu Shuffle
- **Interactive Visualization**: Watch cards move in real-time with smooth animations
- **Step-by-Step Mode**: Break down each shuffle into individual steps with detailed explanations
- **Animation Controls**: Play, pause, stop, and adjust speed of shuffle animations
- **Statistics Tracking**: Compare algorithm performance, execution times, and shuffle quality

### 🎨 User Experience
- **Smooth Animations**: Powered by Framer Motion for fluid, spring-based transitions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility First**: Full keyboard navigation, screen reader support, and ARIA compliance
- **Modern UI**: Clean, intuitive interface with visual feedback

### 📊 Algorithm Insights
- **Time Complexity Information**: Learn about each algorithm's computational efficiency
- **Performance Metrics**: Track execution times, step counts, and shuffle quality
- **Comparative Analysis**: Side-by-side algorithm performance comparison
- **Educational Content**: Detailed descriptions of how each shuffle works

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/xignoe/shuffleDeck.git
   cd shuffleDeck
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 🎮 How to Use

1. **Select Algorithm**: Choose from Fisher-Yates, Riffle, Overhand, or Hindu shuffle
2. **Quick Shuffle**: Click "Shuffle" for instant results
3. **Step-by-Step**: Use "Step Through Shuffle" to see each move
4. **Animation Controls**: Play/pause animations and adjust speed
5. **View Statistics**: Compare algorithm performance and track metrics
6. **Reset**: Return to original ordered deck anytime

## 🏗️ Technical Architecture

### Built With
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with full IntelliSense
- **Vite** - Lightning-fast build tool and dev server
- **Framer Motion** - Production-ready motion library for React
- **CSS3** - Modern styling with Grid, Flexbox, and custom properties

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Card.tsx        # Individual card component
│   ├── DeckDisplay.tsx # Card grid display
│   └── Statistics.tsx  # Performance metrics
├── utils/              # Core logic and algorithms
│   ├── deckUtils.ts    # Shuffle algorithms and deck operations
│   └── statisticsUtils.ts # Performance tracking
├── types/              # TypeScript type definitions
└── App.tsx            # Main application component
```

### Key Algorithms

#### Fisher-Yates Shuffle
- **Time Complexity**: O(n)
- **Description**: Modern, unbiased shuffle algorithm
- **Use Case**: Cryptographically secure randomization

#### Riffle Shuffle
- **Time Complexity**: O(n)
- **Description**: Simulates real-world card shuffling
- **Use Case**: Realistic shuffle simulation

#### Overhand Shuffle
- **Time Complexity**: O(n²)
- **Description**: Common casual shuffling method
- **Use Case**: Educational demonstration of inefficient shuffling

#### Hindu Shuffle
- **Time Complexity**: O(n)
- **Description**: Traditional shuffling technique
- **Use Case**: Cultural shuffling method demonstration

## ♿ Accessibility Features

- **Keyboard Navigation**: Full arrow key navigation through card grid
- **Screen Reader Support**: Comprehensive ARIA labels and descriptions
- **Focus Management**: Clear visual focus indicators and logical tab order
- **Reduced Motion**: Respects user's motion preferences
- **High Contrast**: Supports high contrast mode
- **Touch Friendly**: Optimized touch targets for mobile devices

## 📱 Responsive Design

- **Desktop**: Full 13-column card grid with complete feature set
- **Tablet**: Optimized 8-10 column layout with touch-friendly controls
- **Mobile**: Compact 5-7 column grid with streamlined interface
- **Adaptive**: Smooth transitions between breakpoints

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Card shuffling algorithms based on computer science research
- Accessibility guidelines following WCAG 2.1 standards
- Animation patterns inspired by modern design systems
- Educational content sourced from algorithm analysis literature

---

**Made with ❤️ and lots of ☕**

*Shuffle responsibly!* 🃏

---

# 📋 Comprehensive Code Documentation

This section provides a detailed explanation of every file in the project and what each library accomplishes.

## 📁 **Project Structure Overview**

This is a modern React application built with TypeScript and Vite that visualizes card shuffling algorithms with smooth animations and comprehensive accessibility features.

---

## 🔧 **Configuration Files**

### **`package.json`** - Project Dependencies & Scripts
**Purpose**: Defines the project metadata, dependencies, and build scripts.

**Key Dependencies**:
- **`react` (19.1.0)**: Core React library for building user interfaces with components, hooks, and state management
- **`react-dom` (19.1.0)**: React's DOM renderer that handles mounting React components to the browser DOM
- **`framer-motion` (12.23.12)**: Production-ready motion library for React that provides smooth animations, gestures, and layout transitions
- **`typescript` (5.8.3)**: Adds static type checking to JavaScript, catching errors at compile time
- **`vite` (7.0.4)**: Ultra-fast build tool and dev server with hot module replacement (HMR)
- **`eslint`**: Code linting tool that enforces code quality and consistency

**Scripts**:
- `npm run dev`: Starts development server with hot reload
- `npm run build`: Compiles TypeScript and builds for production
- `npm run lint`: Runs code quality checks
- `npm run preview`: Previews production build locally

### **`vite.config.ts`** - Build Tool Configuration
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```
**Purpose**: Configures Vite build tool with React plugin for JSX transformation and fast refresh.

### **`tsconfig.json` & `tsconfig.app.json`** - TypeScript Configuration
**Purpose**: Configures TypeScript compiler options for type checking, module resolution, and build settings.

**Key Settings**:
- `"target": "ES2022"`: Compiles to modern JavaScript
- `"jsx": "react-jsx"`: Uses new JSX transform
- `"strict": true"`: Enables all strict type checking options
- `"moduleResolution": "bundler"`: Optimized for modern bundlers

### **`eslint.config.js`** - Code Quality Configuration
**Purpose**: Configures ESLint with TypeScript and React-specific rules for code quality and consistency.

---

## 🌐 **Entry Point Files**

### **`index.html`** - HTML Template
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Shuffle Deck Visualization</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```
**Purpose**: The HTML template that serves as the entry point. Vite injects the compiled JavaScript and CSS here.

### **`src/main.tsx`** - React Application Bootstrap
```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```
**Purpose**: 
- **`createRoot`**: New React 18 API for rendering applications
- **`StrictMode`**: Enables additional development checks and warnings
- Mounts the main App component to the DOM

### **`src/index.css`** - Global Styles
**Purpose**: Defines global CSS variables, base styles, and responsive design foundations. Sets up the design system with consistent typography, colors, and spacing.

---

## 📊 **Type Definitions**

### **`src/types/card.ts`** - Card Data Structure
```typescript
export interface Card {
  id: string;
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  rank: 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
  position: number;
  isHighlighted: boolean;
}
```
**Purpose**: Defines the structure of a playing card with:
- **`id`**: Unique identifier for React keys
- **`suit`**: One of four card suits (type-safe)
- **`rank`**: Card value (type-safe)
- **`position`**: Current position in deck
- **`isHighlighted`**: Visual state for animations

### **`src/types/shuffle.ts`** - Shuffle Algorithm Types
```typescript
export interface ShuffleStep {
  description: string;
  cardIndices: number[];
  action: 'swap' | 'move' | 'split' | 'merge';
  fromPositions: number[];
  toPositions: number[];
}
```
**Purpose**: Defines complex types for:
- **`ShuffleStep`**: Individual steps in shuffle visualization
- **`ShuffleAlgorithm`**: Algorithm metadata and execution
- **`AnimationState`**: Animation control state
- **`ShuffleStatistics`**: Performance tracking data

### **`src/types/index.ts`** - Type Exports
**Purpose**: Central export point for all type definitions, enabling clean imports throughout the app.

---

## 🧠 **Core Logic Files**

### **`src/utils/deckUtils.ts`** - Shuffle Algorithms & Deck Operations
**Purpose**: Contains the heart of the application - all shuffle algorithms and deck manipulation functions.

**Key Functions**:
- **`createOrderedDeck()`**: Generates a standard 52-card deck in order
- **`fisherYatesShuffle()`**: Modern, unbiased O(n) shuffle algorithm
- **`riffleShuffle()`**: Simulates real-world riffle shuffling
- **`overhandShuffle()`**: Casual shuffling method
- **`hinduShuffle()`**: Traditional shuffling technique
- **Step-by-step versions**: `fisherYatesShuffleSteps()`, etc. for visualization
- **`applyShuffleStep()`**: Applies individual shuffle steps for animation
- **`clearHighlights()`**: Resets card visual states

**Algorithm Implementations**:
```typescript
// Fisher-Yates: Modern, cryptographically secure
for (let i = shuffledDeck.length - 1; i > 0; i--) {
  const randomIndex = Math.floor(Math.random() * (i + 1));
  [shuffledDeck[i], shuffledDeck[randomIndex]] = [shuffledDeck[randomIndex], shuffledDeck[i]];
}

// Riffle: Splits deck and interleaves cards
const midpoint = Math.floor(deck.length / 2);
const leftHalf = deck.slice(0, midpoint);
const rightHalf = deck.slice(midpoint);
```

### **`src/utils/statisticsUtils.ts`** - Performance Tracking
**Purpose**: Handles statistical analysis of shuffle algorithms.

**Key Functions**:
- **`initializeAlgorithmStatistics()`**: Sets up tracking for each algorithm
- **`updateAlgorithmStatistics()`**: Records performance metrics
- **`calculateRandomnessScore()`**: Measures shuffle quality
- **`calculateAverageExecutionTime()`**: Performance analysis

---

## 🎨 **React Components**

### **`src/App.tsx`** - Main Application Component (500+ lines)
**Purpose**: The central orchestrator that manages all application state and user interactions.

**Key Responsibilities**:
- **State Management**: Manages deck state, shuffle algorithms, animation controls
- **Algorithm Selection**: Handles switching between different shuffle methods
- **Step-by-Step Mode**: Controls manual stepping through shuffle process
- **Animation Control**: Play/pause/stop/speed controls for automated stepping
- **Statistics Integration**: Tracks and displays performance metrics
- **User Interface**: Renders all UI components and handles user interactions

**Key State Variables**:
```typescript
const [deck, setDeck] = useState<Card[]>([])
const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('Fisher-Yates')
const [shuffleSteps, setShuffleSteps] = useState<ShuffleStep[]>([])
const [animationState, setAnimationState] = useState<AnimationState>({...})
const [algorithmStats, setAlgorithmStats] = useState<Map<string, ShuffleStatistics>>(...)
```

### **`src/components/Card.tsx`** - Individual Card Component
**Purpose**: Renders a single playing card with Framer Motion animations.

**Key Features**:
- **Framer Motion Integration**: Smooth animations for highlighting and movement
- **Accessibility**: ARIA labels, keyboard focus, screen reader support
- **Visual States**: Normal, highlighted, focused states
- **Responsive Design**: Adapts to different screen sizes

```typescript
<motion.div 
  className={`card ${card.isHighlighted ? 'highlighted' : ''}`}
  animate={{
    scale: card.isHighlighted ? 1.05 : 1,
    y: card.isHighlighted ? -4 : 0,
  }}
  whileHover={{ y: -2 }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
  role="img"
  aria-label={`${card.rank} of ${card.suit}`}
>
```

### **`src/components/DeckDisplay.tsx`** - Card Grid Display
**Purpose**: Renders the entire deck of cards in a responsive grid with layout animations.

**Key Features**:
- **Framer Motion Layout**: Smooth transitions when cards change positions
- **Responsive Grid**: Adapts from 13 columns (desktop) to 5 columns (mobile)
- **Keyboard Navigation**: Arrow key navigation through card grid
- **Accessibility**: Grid roles, ARIA labels, focus management

```typescript
<motion.div 
  className="cards-grid"
  role="grid"
  aria-label={title || "Card deck display"}
>
  <AnimatePresence mode="popLayout">
    {cards.map((card, index) => (
      <motion.div key={card.id} layout>
        <Card card={card} />
      </motion.div>
    ))}
  </AnimatePresence>
</motion.div>
```

### **`src/components/Statistics.tsx`** - Performance Metrics Display
**Purpose**: Shows algorithm performance statistics and comparisons.

**Key Features**:
- **Real-time Updates**: Shows current algorithm performance
- **Comparison Mode**: Side-by-side algorithm comparison
- **Performance Metrics**: Execution time, step count, randomness score
- **Data Visualization**: Clear presentation of statistical data

---

## 🎨 **Styling Files**

### **`src/App.css`** - Main Application Styles
**Purpose**: Comprehensive styling for the entire application.

**Key Features**:
- **Responsive Design**: Multiple breakpoints for different devices
- **Accessibility**: High contrast mode, reduced motion support
- **Touch Optimization**: Minimum 44px touch targets for mobile
- **Visual Hierarchy**: Consistent spacing, typography, and color scheme

### **`src/components/Card.css`** - Card-Specific Styles
**Purpose**: Detailed styling for individual cards with responsive adjustments.

### **`src/components/DeckDisplay.css`** - Grid Layout Styles
**Purpose**: Responsive grid system that adapts to different screen sizes.

### **`src/components/Statistics.css`** - Statistics Component Styles
**Purpose**: Styling for performance metrics display and comparison views.

---

## 🧪 **Test Files**

### **`test-shuffle.js`** - Fisher-Yates Algorithm Test
**Purpose**: Standalone test to verify the Fisher-Yates shuffle algorithm works correctly.

```javascript
// Tests randomness and ensures all cards remain in deck
for (let i = 0; i < 5; i++) {
  const shuffled = fisherYatesShuffle(testDeck);
  console.log(`Shuffle ${i + 1}:`, shuffled.map(card => card.rank));
}
```

### **`test-riffle.js`** - Riffle Shuffle Test
**Purpose**: Conceptual test file for riffle shuffle implementation.

---

## 📦 **Build Output (`dist/` folder)**

### **`dist/index.html`** - Production HTML
**Purpose**: Optimized HTML with inlined assets for production deployment.

### **`dist/assets/`** - Compiled Assets
- **`index-D1wW14nb.css`**: Minified and optimized CSS bundle
- **`index-Ds16A0wZ.js`**: Minified JavaScript bundle with all React code

---

## 🔧 **Library Deep Dive**

### **React 19.1.0**
- **Purpose**: Component-based UI library
- **Key Features**: Hooks, concurrent features, automatic batching
- **Usage**: All UI components, state management, lifecycle management

### **Framer Motion 12.23.12**
- **Purpose**: Production-ready animation library
- **Key Features**: Layout animations, gesture handling, spring physics
- **Usage**: Card animations, layout transitions, hover effects

### **TypeScript 5.8.3**
- **Purpose**: Static type checking for JavaScript
- **Key Features**: Interface definitions, type safety, IntelliSense
- **Usage**: All source files have type definitions and checking

### **Vite 7.0.4**
- **Purpose**: Next-generation build tool
- **Key Features**: Instant server start, lightning-fast HMR, optimized builds
- **Usage**: Development server, production builds, asset optimization

---

## 🎯 **Application Flow**

1. **Initialization**: `main.tsx` renders `App.tsx` into DOM
2. **Deck Creation**: `deckUtils.ts` creates ordered 52-card deck
3. **User Interaction**: User selects algorithm and shuffle mode
4. **Algorithm Execution**: Chosen shuffle algorithm processes deck
5. **Visualization**: Cards animate using Framer Motion
6. **Statistics**: Performance metrics are tracked and displayed
7. **Accessibility**: Screen readers and keyboard navigation work throughout

This architecture creates a robust, performant, and accessible card shuffling visualization that demonstrates computer science algorithms in an engaging, interactive way.

## 🔍 **Code Quality & Best Practices**

### **Type Safety**
- Full TypeScript coverage with strict mode enabled
- Interface definitions for all data structures
- Type-safe props and state management

### **Performance Optimization**
- React 18 concurrent features for smooth rendering
- Framer Motion's optimized animation engine
- Vite's fast build system and tree shaking

### **Accessibility Standards**
- WCAG 2.1 AA compliance
- Full keyboard navigation support
- Screen reader compatibility
- High contrast and reduced motion support

### **Modern Development Practices**
- ES2022+ JavaScript features
- Modular component architecture
- Separation of concerns (UI, logic, types)
- Comprehensive error handling