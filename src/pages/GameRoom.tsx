import React, { useEffect, useState } from "react";
import { Client } from "boardgame.io/react";
import { SeptetDemi } from "../game/SeptDemi";

interface GameProps {
    game: any;
}

const GameRoom: React.FC<GameProps> = ({ game }) => {
    const [playerHand, setPlayerHand] = useState<number[]>([]);
    const [playerScore, setPlayerScore] = useState<number>(0);
    const [deckCount, setDeckCount] = useState<number>(0);

    // Cette fonction est appelée quand un joueur pioche une carte
    const drawCard = () => {
        game.moves.drawCard();
        const updatedHand = game.state.players[game.playerID].hand;
        const updatedScore = updatedHand.reduce((a: number, b: number) => a + b, 0);
        setPlayerHand(updatedHand);
        setPlayerScore(updatedScore);
        setDeckCount(game.state.deck.length); // Mettre à jour le nombre de cartes restantes
    };

    // Cette fonction est appelée quand un joueur choisit de rester
    const stay = () => {
        game.moves.stay();
    };

    useEffect(() => {
        if (game.state.players[game.playerID]) {
            setPlayerHand(game.state.players[game.playerID].hand);
            setPlayerScore(game.state.players[game.playerID].score);
            setDeckCount(game.state.deck.length);
        }
    }, [game.state]);

    return (
        <div className="game-room">
            <h2>Bienvenue dans le jeu 7 1/2</h2>

            {/* Main du joueur actuel */}
            <div>
                <h3>Votre main</h3>
                <div className="hand">
                    {playerHand.map((card, index) => (
                        <span key={index} className="card">
                            {card}
                        </span>
                    ))}
                </div>
                <p>Score: {playerScore}</p>
            </div>

            {/* Deck restant */}
            <div>
                <h3>Cartes restantes dans le paquet : {deckCount}</h3>
            </div>

            {/* Actions disponibles */}
            <div>
                <button onClick={drawCard} disabled={playerScore > 7.5}>
                    Piocher une carte
                </button>
                <button onClick={stay} disabled={playerScore > 7.5}>
                    Rester
                </button>
            </div>
        </div>
    );
};

const Game = Client({
    game: SeptetDemi,
    numPlayers: 4,
});

export default Game;
