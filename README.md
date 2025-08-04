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
