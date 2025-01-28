// src/components/Game.js
import React from 'react';

export default function Game() {
    const navigate = useNavigate();

    const handleImprove = () => {
        console.log('Améliorer le personnage');
        // ex: navigate('/improve');
    };

    const handleDungeon = async () => {
        console.log('Entrer dans un donjon');
        const response = await fetch('http://localhost:5002/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
             },
            body: {}
        });

        navigate('/dungeon');
    };

    const handleBack = () => {
        console.log('Retour au choix du héros');
        navigate('/');
    };

    return (
        <div className="game-container">
            <button className="back-button" onClick={handleBack}>
                Changer de héros
            </button>
            <div className="game-actions">
                <div className="game-card" onClick={handleImprove}>
                    <h3>Améliorer mon héros</h3>
                </div>
                <div className="game-card" onClick={handleDungeon}>
                    <h3>Entrer dans un donjon</h3>
                </div>
            </div>
        </div>
    );
}
