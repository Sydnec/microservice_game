import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Fight.css';

export default function Fight() {
    let who_attacks = "";
    const navigate = useNavigate();
    const location = useLocation();

    const handleAttack = async () => {
        console.log('Attaque l\'ennemi');
        try {
            who_attacks = location.state.who_attacks ?? who_attacks;
            const response = await fetch('http://localhost:5003/attack', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
               },
               body: {
                attacker: who_attacks
               }
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erreur lors de l\'attaque du héros.');
            }
            const value = await response.json()
            let game_screen = document.getElementById("game-screen")
            console.log(value)
            game_screen.innerText = `${value.message}\nCase n°${value.position}`
            
        } catch (error) {
            console.error('Erreur attaque du héros :', error);
            alert('Impossible de faire attaquer le héros : ' + error.message);
        }
    };

    const handleInventory = async () => {
        console.log("Ouverture de l'inventaire");
    };

    return (
        <div id='options_attaque' className={`game-container ${location.state.fight_begun == true ? "" : "hidden"}`}>
            <div className="game-screen scroller" id="game-screen"></div>
            <div className="game-card" onClick={handleAttack}>
                <h3>Attaquer</h3>
            </div>
            <div className='game-card' onClick={handleInventory}>
                <h3>Gérer l'inventaire</h3>
            </div>
        </div>
    );
}