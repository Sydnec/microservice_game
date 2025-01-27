import React from 'react';

export default function HeroCreateCard({ onCreateHero }) {
  const handleClick = () => {
    const name = prompt('Entrez le nom du nouveau héros :');
    if (name) {
      onCreateHero(name);
    }
  };
  
  return (
    <div className="card plus-card" onClick={handleClick}>
      <span className="plus-sign">+</span>
    </div>
  );
}
