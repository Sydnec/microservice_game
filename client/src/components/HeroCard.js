// src/components/HeroCard.jsx
import React from 'react';

export default function HeroCard({ hero, onDelete, onSelect }) {
  const handleCardClick = () => {
    onSelect?.(hero.id); 
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete?.(hero.id);
  };

  return (
    <div className="card hero-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <h2>{hero.name}</h2>
      <p>Level: {hero.level}</p>
      <p>HP: {hero.hp} / {hero.hp_max}</p>
      <p>Attack: {hero.attack}</p>
      <p>Defense: {hero.defense}</p>
      <p>Gold: {hero.gold}</p>

      {onDelete && (
        <button onClick={handleDelete} className="delete-button">
          🗑️
        </button>
      )}
    </div>
  );
}
