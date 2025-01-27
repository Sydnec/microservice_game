import React, { useState, useEffect } from 'react';

function App() {
  const [heroes, setHeroes] = useState([]);
  const [name, setName] = useState('');

  // Au montage du composant, on récupère les héros existants
  useEffect(() => {
    fetch('http://localhost:5001/heroes') // URL de ton service Héros
      .then((res) => res.json())
      .then((data) => {
        // data peut être un tableau de héros
        // Ajuste si l’endpoint renvoie un objet enveloppe {heroes: [...] }
        setHeroes(data);
      })
      .catch((error) => {
        console.error('Erreur récupération héros :', error);
      });
  }, []);

  // Fonction pour ajouter un nouveau héros
  const handleAddHero = (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    if (!name.trim()) {
      return alert('Veuillez entrer un nom de héros');
    }

    fetch('http://localhost:5001/heroes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erreur lors de la création du héros');
        }
        return res.json();
      })
      .then((newHero) => {
        // On ajoute le nouveau héros dans la liste existante (afin de re-render)
        setHeroes((prev) => [...prev, newHero]);
        // On reset le champ de saisie
        setName('');
      })
      .catch((error) => {
        console.error('Erreur ajout héros :', error);
      });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Liste des Héros</h1>

      {/* Affichage de la liste des héros */}
      <ul>
        {heroes.map((hero) => (
          <li key={hero.id}>
            <strong>{hero.name}</strong> (Lvl: {hero.level}, HP: {hero.hp}, Gold: {hero.gold})
          </li>
        ))}
      </ul>

      <hr />

      <h2>Ajouter un nouveau héros</h2>
      <form onSubmit={handleAddHero}>
        <input
          type="text"
          placeholder="Nom du héros"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}

export default App;
