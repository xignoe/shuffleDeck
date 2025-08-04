import React from 'react';
import type { ShuffleStatistics } from '../types/shuffle';
import { getAverageExecutionTime, compareAlgorithms } from '../utils/statisticsUtils';
import './Statistics.css';

interface StatisticsProps {
  algorithmStats: Map<string, ShuffleStatistics>;
  selectedAlgorithm: string;
  showComparison: boolean;
  onToggleComparison: () => void;
  onClearStats: () => void;
}

const Statistics: React.FC<StatisticsProps> = ({
  algorithmStats,
  selectedAlgorithm,
  showComparison,
  onToggleComparison,
  onClearStats
}) => {
  const currentStats = algorithmStats.get(selectedAlgorithm);
  const allAlgorithms = Array.from(algorithmStats.keys());
  const algorithmsWithData = allAlgorithms.filter(name => {
    const stats = algorithmStats.get(name);
    return stats && stats.shuffleCount > 0;
  });

  if (!currentStats) {
    return (
      <div className="statistics-panel">
        <h3>Statistics</h3>
        <p>No statistics available for {selectedAlgorithm}</p>
      </div>
    );
  }

  const renderAlgorithmStats = (stats: ShuffleStatistics) => (
    <div className="algorithm-stats" key={stats.algorithmName}>
      <h4>{stats.algorithmName}</h4>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">Shuffles:</span>
          <span className="stat-value">{stats.shuffleCount}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Avg Steps:</span>
          <span className="stat-value">{stats.averageSteps}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Randomness Score:</span>
          <span className="stat-value">{stats.randomnessScore}%</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Avg Time:</span>
          <span className="stat-value">{getAverageExecutionTime(stats)}ms</span>
        </div>
      </div>
    </div>
  );

  const renderComparison = () => {
    if (algorithmsWithData.length < 2) {
      return (
        <div className="comparison-view">
          <p>Need at least 2 algorithms with data to show comparison</p>
        </div>
      );
    }

    // Compare the first two algorithms with data
    const [alg1, alg2] = algorithmsWithData;
    const stats1 = algorithmStats.get(alg1)!;
    const stats2 = algorithmStats.get(alg2)!;
    const comparison = compareAlgorithms(stats1, stats2);

    return (
      <div className="comparison-view">
        <h4>Algorithm Comparison</h4>
        <div className="comparison-grid">
          <div className="comparison-metric">
            <h5>Randomness Quality</h5>
            <div className="comparison-row">
              <span>{comparison.randomnessComparison.algorithm1.name}: {comparison.randomnessComparison.algorithm1.score}%</span>
              <span>{comparison.randomnessComparison.algorithm2.name}: {comparison.randomnessComparison.algorithm2.score}%</span>
            </div>
            <div className="winner">
              Winner: <strong>{comparison.randomnessComparison.winner}</strong>
            </div>
          </div>
          
          <div className="comparison-metric">
            <h5>Speed Performance</h5>
            <div className="comparison-row">
              <span>{comparison.speedComparison.algorithm1.name}: {comparison.speedComparison.algorithm1.avgTime}ms</span>
              <span>{comparison.speedComparison.algorithm2.name}: {comparison.speedComparison.algorithm2.avgTime}ms</span>
            </div>
            <div className="winner">
              Winner: <strong>{comparison.speedComparison.winner}</strong>
            </div>
          </div>
          
          <div className="comparison-metric">
            <h5>Step Efficiency</h5>
            <div className="comparison-row">
              <span>{comparison.stepComparison.algorithm1.name}: {comparison.stepComparison.algorithm1.avgSteps} steps</span>
              <span>{comparison.stepComparison.algorithm2.name}: {comparison.stepComparison.algorithm2.avgSteps} steps</span>
            </div>
            <div className="winner">
              Winner: <strong>{comparison.stepComparison.winner}</strong>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="statistics-panel">
      <div className="statistics-header">
        <h3>Statistics</h3>
        <div className="statistics-controls">
          <button 
            onClick={onToggleComparison}
            className={`toggle-button ${showComparison ? 'active' : ''}`}
            disabled={algorithmsWithData.length < 2}
          >
            {showComparison ? 'Hide Comparison' : 'Compare Algorithms'}
          </button>
          <button 
            onClick={onClearStats}
            className="clear-button"
            disabled={algorithmsWithData.length === 0}
          >
            Clear All Stats
          </button>
        </div>
      </div>

      {showComparison ? (
        renderComparison()
      ) : (
        <div className="current-algorithm-stats">
          {renderAlgorithmStats(currentStats)}
          
          {currentStats.shuffleCount > 0 && (
            <div className="randomness-explanation">
              <h5>Randomness Score Explanation</h5>
              <p>
                The randomness score (0-100%) measures how well the algorithm shuffles the deck:
              </p>
              <ul>
                <li><strong>90-100%:</strong> Excellent randomization</li>
                <li><strong>70-89%:</strong> Good randomization</li>
                <li><strong>50-69%:</strong> Fair randomization</li>
                <li><strong>Below 50%:</strong> Poor randomization</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {algorithmsWithData.length > 1 && !showComparison && (
        <div className="all-algorithms-summary">
          <h4>All Algorithms Summary</h4>
          <div className="algorithms-grid">
            {algorithmsWithData.map(algorithmName => {
              const stats = algorithmStats.get(algorithmName)!;
              return (
                <div key={algorithmName} className="algorithm-summary">
                  <h5>{algorithmName}</h5>
                  <div className="summary-stats">
                    <span>{stats.shuffleCount} shuffles</span>
                    <span>{stats.randomnessScore}% randomness</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;