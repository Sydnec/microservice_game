import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatAllocator from './StatAllocator';
import '../styles/HeroCreation.css';

export default function HeroCreation() {
  const [name, setName] = useState('');
  const [stats, setStats] = useState({
    hp_max: 100,
    attack: 0,
    defense: 0,
    speed: 0,
    gold: 20,
  });
  const navigate = useNavigate();

  const handleStatsChange = (newStats) => {
    setStats(newStats);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert('Le nom du héros est requis.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/heroes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          hp: stats.hp_max, // HP égal à HP_MAX
          ...stats,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la création du héros.');
      }

      // Redirection vers "/" après création
      navigate('/', { state: { refresh: true } });
    } catch (error) {
      console.error('Erreur création héros :', error);
      alert('Impossible de créer le héros : ' + error.message);
    }
  };

  return (
    <div className="hero-creation-container">
      <h2>Créer un nouveau héros</h2>
      <div className="creation-form">
        <label>
          Nom :
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Entrez le nom du héros"
          />
        </label>

        <StatAllocator
          initialStats={{
            hp_max: 100,
            attack: 0,
            defense: 0,
            speed: 0,
          }}
          totalPoints={stats.gold}
          onStatsChange={handleStatsChange}
        />

        <button onClick={handleSubmit} className="create-button">
          Créer
        </button>
      </div>
    </div>
  );
}
