import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Fight.css';


export default function Dungeon() {
    const navigate = useNavigate();

    const handleAttack = async () => {
        console.log('Attaque l\'ennemi');
        try {
            const response = await fetch('http://localhost:5003/', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
               }
            });
            const value = await response.json()
            let game_screen = document.getElementById("game-screen")
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erreur lors de l\'attaque du héros.');
            }
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
        <div id='options_attaque' className="game-actions">
            <div className="game-card" onClick={handleAttack}>
                <h3>Attaquer</h3>
            </div>
            <div className='game-card hidden' onClick={handleInventory}>
                <h3>Gérer l'inventaire</h3>
            </div>
        </div>
    );
}