import React, { useState, useEffect } from 'react';
import HeroList from './components/HeroList';
import './styles/Heroes.css'; // On importe la feuille de style globale

export default function App() {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    // Récupère la liste des héros
    fetch('http://localhost:5001/heroes')
      .then(res => res.json())
      .then(data => {
        setHeroes(data);
      })
      .catch(err => console.error('Erreur récupération héros :', err));
  }, []);

  // Fonction pour créer un nouveau héros
  const createHero = async (name) => {
    if (!name.trim()) return;

    try {
      const res = await fetch('http://localhost:5001/heroes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() })
      });
      if (!res.ok) {
        throw new Error('Erreur lors de la création du héros');
      }
      const newHero = await res.json();
      // Mise à jour de la liste
      setHeroes((prev) => [...prev, newHero]);
    } catch (error) {
      console.error('Erreur création héros :', error);
      alert("Impossible de créer le héros (voir console).");
    }
  };

  return (
    <div className="app-container">
      <h1>Mes Héros</h1>
      <HeroList heroes={heroes} onCreateHero={createHero} />
    </div>
  );
}
