import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dungeon.css';


export default function Dungeon() {
    const navigate = useNavigate();
    const [isHidden, setIsHidden] = useState(false);

    const handleMoving = async () => {
        console.log('Déplace le personnage dans le donjon');
        try {
            const response = await fetch('http://localhost:5002/move', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
               }
            });
            const value = await response.json()
            let game_screen = document.getElementById("game-screen")
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erreur lors du déplacement du héros.');
            }
            
            if(value.message !== "Case vide") {
                setIsHidden(true);
            }
            game_screen.innerText = `${value.message}\nCase n°${value.position}`
            
        } catch (error) {
            console.error('Erreur déplacement héros :', error);
            alert('Impossible de déplacer le héros : ' + error.message);
        }
    };

    const handleInventory = async () => {
        console.log("Ouverture de l'inventaire");
    };

    return (
        <div className="game-container">
            <div className={`game-screen ${isHidden ? "hidden" : ""}`} id="game-screen"></div>
            <div id='options_deplacement' className="game-actions">
                <div className="game-card" onClick={handleMoving}>
                    <h3>Avancer d'une case</h3>
                </div>
                <div className='game-card hidden' onClick={handleInventory}>
                    <h3>Gérer l'inventaire</h3>
                </div>
            </div>
            <Fight />
        </div>
    );
}