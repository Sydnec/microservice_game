import React, { useState, useEffect } from 'react';
import '../styles/StatAllocator.css';

export default function StatAllocator({ initialStats, totalPoints, onStatsChange }) {
  const [stats, setStats] = useState(initialStats || {});
  const [remainingPoints, setRemainingPoints] = useState(totalPoints);

  // Utilise un useEffect sans dépendance sur `onStatsChange`
  useEffect(() => {
    const statsWithGold = { ...stats, gold: remainingPoints };
    onStatsChange?.(statsWithGold); // Appelle onStatsChange si défini
  }, [stats, remainingPoints]); // Dépend uniquement de stats et remainingPoints

  const handleStatChange = (stat, increment) => {
    const initialStatValue = initialStats[stat] || 0;
    const currentStatValue = stats[stat];

    if (increment && remainingPoints > 0) {
      setStats((prev) => ({ ...prev, [stat]: currentStatValue + 1 }));
      setRemainingPoints((prev) => prev - 1);
    } else if (!increment && currentStatValue > initialStatValue) {
      setStats((prev) => ({ ...prev, [stat]: currentStatValue - 1 }));
      setRemainingPoints((prev) => prev + 1);
    }
  };

  return (
    <div className="stat-allocator">
      <p>Points restants : {remainingPoints}</p>
      {Object.keys(stats).map((stat) => (
        <div key={stat} className="stat-row">
          <span className="stat-name">
            {stat.charAt(0).toUpperCase() + stat.slice(1)} : {stats[stat]}
          </span>
          <button
            onClick={() => handleStatChange(stat, false)}
            disabled={stats[stat] <= (initialStats[stat] || 0)}
          >
            -
          </button>
          <button
            onClick={() => handleStatChange(stat, true)}
            disabled={remainingPoints <= 0}
          >
            +
          </button>
        </div>
      ))}
    </div>
  );
}
