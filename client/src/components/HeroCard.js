import React from 'react';

export default function HeroCard({ hero, onDelete }) {
  const handleDelete = () => {
    onDelete(hero.id);
  };

  return (
    <div className="card hero-card">
      <h2>{hero.name}</h2>
      <p>Level: {hero.level}</p>
      <p>HP: {hero.hp} / {hero.hp_max}</p>
      <p>Attack: {hero.attack}</p>
      <p>Defense: {hero.defense}</p>
      <p>Gold: {hero.gold}</p>

      <button onClick={handleDelete} className="delete-button">
        🗑️
      </button>
    </div>
  );
}
