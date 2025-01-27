import React, { useState, useEffect } from 'react';
import HeroCard from './HeroCard';
import HeroCreateCard from './HeroCreateCard';

export default function HeroList() {
  const [heroes, setHeroes] = useState([]);

  // Charger tous les héros au montage
  useEffect(() => {
    fetch('http://localhost:5001/heroes')
      .then((res) => res.json())
      .then((data) => setHeroes(data))
      .catch((err) => console.error('Erreur récupération héros :', err));
  }, []);

  // Fonction pour créer un nouveau héros (POST)
  const handleCreateHero = async (heroName) => {
    if (!heroName) return;
    try {
      const response = await fetch('http://localhost:5001/heroes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: heroName.trim() })
      });
      if (!response.ok) {
        throw new Error('Erreur création héros');
      }
      const newHero = await response.json();
      setHeroes((prev) => [...prev, newHero]);
    } catch (error) {
      console.error('Erreur création héros :', error);
    }
  };

  // Fonction pour supprimer un héros (DELETE)
  const deleteHero = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/heroes/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Erreur suppression héros');
      }
      // Retire le héros du state
      setHeroes((prev) => prev.filter((hero) => hero.id !== id));
    } catch (error) {
      console.error('Erreur suppression héros :', error);
      alert('Impossible de supprimer ce héros.');
    }
  };

  return (
    <div className="hero-list">
      {heroes.map((hero) => (
        <HeroCard
          key={hero.id}
          hero={hero}
          onDelete={deleteHero}
        />
      ))}

      <HeroCreateCard onCreateHero={handleCreateHero} />
    </div>
  );
}
