import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Dungeon.css';


export default function Dungeon() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleMoving = async () => {
        console.log('Déplace le personnage dans le donjon');
        try {
            const response_move = await fetch('http://localhost:5002/move', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
               }
            });
            if (!response_move.ok) {
                const errorData = await response_move.json();
                throw new Error(errorData.error || 'Erreur lors du déplacement du héros.');
            }
            const json_move = await response_move.json()
            let game_screen = document.getElementById("game-screen")
            
            if(json_move.message !== "Case vide") {
                const monster = json_move.message === "Combat avec un monstre" ? json_move.monster : json_move.boss;
                const response_init_fight = await fetch('http://localhost:5003/init_fight', {
                    method: 'POST',
                    header: { 'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: {
                        player: location.state.player,
                        monster: monster
                    }
                })
                const json_init_fight = await response_init_fight.json();
                navigate("/fight", { state: { fight_begun: true, monster: monster, who_attacks: json_init_fight.who_attacks }})
            }
            game_screen.innerText = `${json_move.message}\nCase n°${json_move.position}`
            
        } catch (error) {
            console.error('Erreur déplacement héros :', error);
            alert('Impossible de déplacer le héros : ' + error.message);
        }
    };

    const handleInventory = async () => {
        console.log("Ouverture de l'inventaire");
    };

    return (
        <div className={`game-container ${location.state?.fight_finished == false ? "hidden" : ""}`}>
            <div className="game-screen" id="game-screen"></div>
            <div id='options_deplacement' className="game-actions">
                <div className="game-card" onClick={handleMoving}>
                    <h3>Avancer d'une case</h3>
                </div>
                <div className='game-card hidden' onClick={handleInventory}>
                    <h3>Gérer l'inventaire</h3>
                </div>
            </div>
        </div>
    );
}