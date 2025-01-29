import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HeroCard from './HeroCard';
import HeroCreateCard from './HeroCreateCard';

export default function HeroList() {
    const [heroes, setHeroes] = useState([]);
    const location = useLocation(); // Permet de récupérer l'état de la navigation
    const navigate = useNavigate();

    // Charger la liste des héros
    const fetchHeroes = () => {
        fetch('http://localhost:5001/heroes')
            .then((res) => res.json())
            .then((data) => setHeroes(data))
            .catch((err) => console.error('Erreur récupération héros :', err));
    };

    useEffect(() => {
        fetchHeroes(); // Charger les héros au montage

        // Recharger si on revient sur la page avec une demande explicite de rafraîchissement
        if (location.state?.refresh) {
            fetchHeroes();
            // Supprime l'état pour éviter un rechargement infini
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state, navigate]);

    // Supprimer un héros
    const deleteHero = async (id) => {
        try {
            const response = await fetch(`http://localhost:5001/heroes/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Erreur suppression héros');
            }
            setHeroes((prev) => prev.filter((hero) => hero.id !== id)); // Retirer le héros localement
        } catch (error) {
            console.error('Erreur suppression héros :', error);
            alert('Impossible de supprimer ce héros.');
        }
    };

    // Rediriger vers la création de héros
    const navigateToCreateHero = () => {
        navigate('/create', { state: { onRefresh: true } });
    };

    // Sélectionner un héros pour jouer
    const selectHero = (hero) => {
        navigate('/game', { state: { hero } });
    };

    return (
        <div className="hero-list">
            {heroes.map((hero) => (
                <HeroCard
                    key={hero.id}
                    hero={hero}
                    onDelete={deleteHero}
                    onSelect={selectHero}
                />
            ))}

            <HeroCreateCard onCreateHero={navigateToCreateHero} />
        </div>
    );
}
