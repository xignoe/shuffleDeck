import { useState, useEffect, useRef } from 'react'
import type { Card } from './types'
import type { ShuffleStep, AnimationState, ShuffleStatistics } from './types/shuffle'
import { 
  createOrderedDeck, 
  fisherYatesShuffle, 
  riffleShuffle,
  overhandShuffle,
  hinduShuffle,
  resetDeck, 
  fisherYatesShuffleSteps,
  riffleShuffleSteps,
  overhandShuffleSteps,
  hinduShuffleSteps,
  applyShuffleStep,
  clearHighlights,
  SHUFFLE_ALGORITHMS,
  getAlgorithmByName
} from './utils/deckUtils'
import { 
  initializeAlgorithmStatistics, 
  updateAlgorithmStatistics 
} from './utils/statisticsUtils'
import DeckDisplay from './components/DeckDisplay'
import Statistics from './components/Statistics'
import './App.css'

function App() {
  const [deck, setDeck] = useState<Card[]>([])
  const [originalDeck, setOriginalDeck] = useState<Card[]>([])
  const [isShuffled, setIsShuffled] = useState(false)
  const [, setShuffleCount] = useState(0)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('Fisher-Yates')
  
  // Enhanced statistics state
  const [algorithmStats, setAlgorithmStats] = useState<Map<string, ShuffleStatistics>>(new Map())
  const [showComparison, setShowComparison] = useState(false)
  
  // Step-by-step visualization state
  const [shuffleSteps, setShuffleSteps] = useState<ShuffleStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [isStepMode, setIsStepMode] = useState(false)
  const [stepDeck, setStepDeck] = useState<Card[]>([])
  
  // Animation state
  const [animationState, setAnimationState] = useState<AnimationState>({
    isPlaying: false,
    isPaused: false,
    speed: 1, // 1x speed by default
    currentStepIndex: -1,
    highlightedCards: []
  })
  
  const animationIntervalRef = useRef<number | null>(null)

  useEffect(() => {
    // Initialize with ordered deck
    const orderedDeck = createOrderedDeck()
    setDeck(orderedDeck)
    setOriginalDeck(orderedDeck)
    
    // Initialize statistics for all algorithms
    const initialStats = new Map<string, ShuffleStatistics>()
    SHUFFLE_ALGORITHMS.forEach(algorithm => {
      initialStats.set(algorithm.name, initializeAlgorithmStatistics(algorithm.name))
    })
    setAlgorithmStats(initialStats)
  }, [])

  const handleShuffle = () => {
    const startTime = performance.now()
    let shuffledDeck: Card[]
    let steps: ShuffleStep[]
    
    // Use the selected algorithm
    switch (selectedAlgorithm) {
      case 'Riffle Shuffle':
        shuffledDeck = riffleShuffle(deck)
        steps = riffleShuffleSteps(deck)
        break
      case 'Overhand Shuffle':
        shuffledDeck = overhandShuffle(deck)
        steps = overhandShuffleSteps(deck)
        break
      case 'Hindu Shuffle':
        shuffledDeck = hinduShuffle(deck)
        steps = hinduShuffleSteps(deck)
        break
      case 'Fisher-Yates':
      default:
        shuffledDeck = fisherYatesShuffle(deck)
        steps = fisherYatesShuffleSteps(deck)
        break
    }
    
    const endTime = performance.now()
    const executionTime = endTime - startTime
    
    // Update statistics
    const currentStats = algorithmStats.get(selectedAlgorithm)
    if (currentStats) {
      const updatedStats = updateAlgorithmStatistics(
        currentStats,
        originalDeck,
        shuffledDeck,
        executionTime,
        steps.length
      )
      
      setAlgorithmStats(prev => {
        const newStats = new Map(prev)
        newStats.set(selectedAlgorithm, updatedStats)
        return newStats
      })
    }
    
    setDeck(shuffledDeck)
    setIsShuffled(true)
    setShuffleCount(prev => prev + 1)
    
    // Exit step mode if active
    if (isStepMode) {
      setIsStepMode(false)
      setCurrentStepIndex(-1)
      setShuffleSteps([])
    }
  }

  const handleStepThroughShuffle = () => {
    // Generate shuffle steps based on selected algorithm
    let steps: ShuffleStep[]
    
    switch (selectedAlgorithm) {
      case 'Riffle Shuffle':
        steps = riffleShuffleSteps(deck)
        break
      case 'Overhand Shuffle':
        steps = overhandShuffleSteps(deck)
        break
      case 'Hindu Shuffle':
        steps = hinduShuffleSteps(deck)
        break
      case 'Fisher-Yates':
      default:
        steps = fisherYatesShuffleSteps(deck)
        break
    }
    
    setShuffleSteps(steps)
    setCurrentStepIndex(-1)
    setIsStepMode(true)
    setStepDeck(clearHighlights([...deck]))
    setIsShuffled(false)
    
    // Reset animation state
    stopAnimation()
    setAnimationState(prev => ({ 
      ...prev, 
      isPlaying: false, 
      isPaused: false, 
      currentStepIndex: -1,
      highlightedCards: []
    }))
  }

  const handleNextStep = () => {
    if (currentStepIndex < shuffleSteps.length - 1) {
      const nextStepIndex = currentStepIndex + 1
      const step = shuffleSteps[nextStepIndex]
      const newDeck = applyShuffleStep(stepDeck, step)
      
      setStepDeck(newDeck)
      setCurrentStepIndex(nextStepIndex)
      
      // If this was the last step, mark as shuffled and update statistics
      if (nextStepIndex === shuffleSteps.length - 1) {
        setIsShuffled(true)
        setShuffleCount(prev => prev + 1)
        
        // Update statistics for step-through shuffle
        const currentStats = algorithmStats.get(selectedAlgorithm)
        if (currentStats) {
          const updatedStats = updateAlgorithmStatistics(
            currentStats,
            originalDeck,
            newDeck,
            0, // No execution time for manual stepping
            shuffleSteps.length
          )
          
          setAlgorithmStats(prev => {
            const newStats = new Map(prev)
            newStats.set(selectedAlgorithm, updatedStats)
            return newStats
          })
        }
      }
    }
  }

  const handlePreviousStep = () => {
    if (currentStepIndex >= 0) {
      // Rebuild deck state up to the previous step
      let newDeck = clearHighlights([...originalDeck])
      const targetStepIndex = currentStepIndex - 1
      
      for (let i = 0; i <= targetStepIndex; i++) {
        newDeck = applyShuffleStep(newDeck, shuffleSteps[i])
      }
      
      // Clear highlights if we're going back to the beginning
      if (targetStepIndex < 0) {
        newDeck = clearHighlights(newDeck)
      }
      
      setStepDeck(newDeck)
      setCurrentStepIndex(targetStepIndex)
      setIsShuffled(targetStepIndex >= 0)
    }
  }

  const handleReset = () => {
    const resetOrderedDeck = resetDeck(createOrderedDeck())
    setDeck(resetOrderedDeck)
    setOriginalDeck(resetOrderedDeck)
    setIsShuffled(false)
    setShuffleCount(0)
    
    // Reset step mode
    setIsStepMode(false)
    setCurrentStepIndex(-1)
    setShuffleSteps([])
    setStepDeck([])
    
    // Reset animation state
    stopAnimation()
    setAnimationState({
      isPlaying: false,
      isPaused: false,
      speed: 1,
      currentStepIndex: -1,
      highlightedCards: []
    })
  }

  const startAnimation = () => {
    if (!isStepMode || shuffleSteps.length === 0) return
    
    setAnimationState(prev => ({ ...prev, isPlaying: true, isPaused: false }))
    
    const runAnimation = () => {
      const stepDelay = 1000 / animationState.speed // Base delay of 1 second, adjusted by speed
      
      animationIntervalRef.current = setInterval(() => {
        setCurrentStepIndex(prevIndex => {
          const nextIndex = prevIndex + 1
          
          if (nextIndex >= shuffleSteps.length) {
            // Animation complete
            stopAnimation()
            setIsShuffled(true)
            setShuffleCount(prev => prev + 1)
            
            // Update statistics for animated shuffle
            const currentStats = algorithmStats.get(selectedAlgorithm)
            if (currentStats) {
              setStepDeck(currentDeck => {
                const updatedStats = updateAlgorithmStatistics(
                  currentStats,
                  originalDeck,
                  currentDeck,
                  0, // No execution time for animated stepping
                  shuffleSteps.length
                )
                
                setAlgorithmStats(prev => {
                  const newStats = new Map(prev)
                  newStats.set(selectedAlgorithm, updatedStats)
                  return newStats
                })
                
                return currentDeck
              })
            }
            
            return prevIndex
          }
          
          // Apply the next step
          const step = shuffleSteps[nextIndex]
          setStepDeck(prevDeck => applyShuffleStep(prevDeck, step))
          
          return nextIndex
        })
      }, stepDelay)
    }
    
    runAnimation()
  }

  const pauseAnimation = () => {
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current)
      animationIntervalRef.current = null
    }
    setAnimationState(prev => ({ ...prev, isPlaying: false, isPaused: true }))
  }

  const stopAnimation = () => {
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current)
      animationIntervalRef.current = null
    }
    setAnimationState(prev => ({ ...prev, isPlaying: false, isPaused: false }))
  }

  const handleSpeedChange = (newSpeed: number) => {
    const wasPlaying = animationState.isPlaying
    
    setAnimationState(prev => ({ ...prev, speed: newSpeed }))
    
    // If animation is currently playing, restart with new speed
    if (wasPlaying) {
      stopAnimation()
      // Use setTimeout to ensure state update completes before restarting
      setTimeout(() => {
        setAnimationState(prev => ({ ...prev, isPlaying: true, isPaused: false }))
        
        const stepDelay = 1000 / newSpeed
        
        animationIntervalRef.current = setInterval(() => {
          setCurrentStepIndex(prevIndex => {
            const nextIndex = prevIndex + 1
            
            if (nextIndex >= shuffleSteps.length) {
              stopAnimation()
              setIsShuffled(true)
              setShuffleCount(prev => prev + 1)
              
              // Update statistics for speed-changed animated shuffle
              const currentStats = algorithmStats.get(selectedAlgorithm)
              if (currentStats) {
                setStepDeck(currentDeck => {
                  const updatedStats = updateAlgorithmStatistics(
                    currentStats,
                    originalDeck,
                    currentDeck,
                    0, // No execution time for animated stepping
                    shuffleSteps.length
                  )
                  
                  setAlgorithmStats(prev => {
                    const newStats = new Map(prev)
                    newStats.set(selectedAlgorithm, updatedStats)
                    return newStats
                  })
                  
                  return currentDeck
                })
              }
              
              return prevIndex
            }
            
            const step = shuffleSteps[nextIndex]
            setStepDeck(prevDeck => applyShuffleStep(prevDeck, step))
            
            return nextIndex
          })
        }, stepDelay)
      }, 100)
    }
  }

  // Statistics control functions
  const handleToggleComparison = () => {
    setShowComparison(prev => !prev)
  }

  const handleClearStats = () => {
    const clearedStats = new Map<string, ShuffleStatistics>()
    SHUFFLE_ALGORITHMS.forEach(algorithm => {
      clearedStats.set(algorithm.name, initializeAlgorithmStatistics(algorithm.name))
    })
    setAlgorithmStats(clearedStats)
    setShuffleCount(0)
  }

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current)
      }
    }
  }, [])

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header className="app-header">
        <h1>Shuffle Deck Visualization</h1>
        <p>Interactive card shuffling algorithm demonstration</p>
      </header>
      
      <main className="app-main" role="main" id="main-content">
        <div className="algorithm-selector">
          <label htmlFor="algorithm-select">Choose Algorithm:</label>
          <select 
            id="algorithm-select"
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
            className="algorithm-dropdown"
            disabled={isStepMode}
            aria-describedby="algorithm-description"
          >
            {SHUFFLE_ALGORITHMS.map(algorithm => (
              <option key={algorithm.name} value={algorithm.name}>
                {algorithm.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="algorithm-description" id="algorithm-description" role="region" aria-label="Algorithm information">
          <p>{getAlgorithmByName(selectedAlgorithm)?.description}</p>
          <p><strong>Time Complexity:</strong> {getAlgorithmByName(selectedAlgorithm)?.timeComplexity}</p>
        </div>
        
        <div className="controls" role="group" aria-label="Shuffle controls">
          <button 
            onClick={handleShuffle}
            className="shuffle-button"
            disabled={isStepMode}
            aria-describedby="shuffle-help"
          >
            Shuffle ({selectedAlgorithm})
          </button>
          <button 
            onClick={handleStepThroughShuffle}
            className="step-shuffle-button"
            disabled={isStepMode}
            aria-describedby="step-help"
          >
            Step Through Shuffle
          </button>
          <button 
            onClick={handleReset}
            className="reset-button"
            disabled={!isShuffled && !isStepMode}
            aria-describedby="reset-help"
          >
            Reset
          </button>
        </div>
        
        <div className="sr-only">
          <div id="shuffle-help">Instantly shuffle the deck using the selected algorithm</div>
          <div id="step-help">Start step-by-step visualization of the shuffle process</div>
          <div id="reset-help">Reset the deck to its original ordered state</div>
        </div>
        
        {isStepMode && (
          <div className="step-controls" role="region" aria-label="Step-by-step controls">
            <div className="manual-controls" role="group" aria-label="Manual step controls">
              <button 
                onClick={handlePreviousStep}
                className="step-button"
                disabled={currentStepIndex < 0 || animationState.isPlaying}
                aria-label="Go to previous shuffle step"
              >
                Previous Step
              </button>
              <button 
                onClick={handleNextStep}
                className="step-button"
                disabled={currentStepIndex >= shuffleSteps.length - 1 || animationState.isPlaying}
                aria-label="Go to next shuffle step"
              >
                Next Step
              </button>
            </div>
            
            <div className="animation-controls" role="group" aria-label="Animation controls">
              <div className="play-pause-controls">
                {!animationState.isPlaying ? (
                  <button 
                    onClick={startAnimation}
                    className="play-button"
                    disabled={currentStepIndex >= shuffleSteps.length - 1}
                    aria-label={animationState.isPaused ? 'Resume animation' : 'Start animation'}
                  >
                    {animationState.isPaused ? 'Resume' : 'Play'}
                  </button>
                ) : (
                  <button 
                    onClick={pauseAnimation}
                    className="pause-button"
                    aria-label="Pause animation"
                  >
                    Pause
                  </button>
                )}
                <button 
                  onClick={stopAnimation}
                  className="stop-button"
                  disabled={!animationState.isPlaying && !animationState.isPaused}
                  aria-label="Stop animation"
                >
                  Stop
                </button>
              </div>
              
              <div className="speed-controls">
                <label htmlFor="speed-control">Speed:</label>
                <div className="speed-buttons" role="group" aria-label="Animation speed selection">
                  <button 
                    onClick={() => handleSpeedChange(0.5)}
                    className={`speed-button ${animationState.speed === 0.5 ? 'active' : ''}`}
                    aria-pressed={animationState.speed === 0.5}
                    aria-label="Set animation speed to slow"
                  >
                    Slow
                  </button>
                  <button 
                    onClick={() => handleSpeedChange(1)}
                    className={`speed-button ${animationState.speed === 1 ? 'active' : ''}`}
                    aria-pressed={animationState.speed === 1}
                    aria-label="Set animation speed to medium"
                  >
                    Medium
                  </button>
                  <button 
                    onClick={() => handleSpeedChange(2)}
                    className={`speed-button ${animationState.speed === 2 ? 'active' : ''}`}
                    aria-pressed={animationState.speed === 2}
                    aria-label="Set animation speed to fast"
                  >
                    Fast
                  </button>
                </div>
              </div>
            </div>
            
            <div className="step-info" role="status" aria-live="polite">
              {currentStepIndex >= 0 && shuffleSteps[currentStepIndex] && (
                <p className="step-description">
                  {shuffleSteps[currentStepIndex].description}
                </p>
              )}
              <p className="step-progress">
                Step {Math.max(0, currentStepIndex + 1)} of {shuffleSteps.length}
              </p>
            </div>
          </div>
        )}
        
        <Statistics
          algorithmStats={algorithmStats}
          selectedAlgorithm={selectedAlgorithm}
          showComparison={showComparison}
          onToggleComparison={handleToggleComparison}
          onClearStats={handleClearStats}
        />
        
        {isStepMode ? (
          <div className="step-view">
            <DeckDisplay 
              cards={stepDeck} 
              title={currentStepIndex >= 0 ? "Shuffle in Progress" : "Ready to Start Step-by-Step Shuffle"}
              isAnimating={animationState.isPlaying}
            />
          </div>
        ) : isShuffled ? (
          <div className="comparison-view">
            <DeckDisplay 
              cards={originalDeck} 
              title="Before (Original Order)"
            />
            <DeckDisplay 
              cards={deck} 
              title="After (Shuffled)"
            />
          </div>
        ) : (
          <DeckDisplay 
            cards={deck} 
            title="Standard 52-Card Deck (Ordered)"
          />
        )}
      </main>
    </div>
  )
}

export default App
