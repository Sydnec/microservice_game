// src/components/Game.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Game.css';

export default function Game() {
    const navigate = useNavigate();

    const handleImprove = () => {
        console.log('Améliorer le personnage');
        // ex: navigate('/improve');
    };

    const handleDungeon = () => {
        console.log('Entrer dans un donjon');
        // ex: navigate('/dungeon');
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
