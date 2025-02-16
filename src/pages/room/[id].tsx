import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Client } from "boardgame.io/react";
import { SeptetDemi } from "../../game/SeptDemi";

const GameRoomPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query; // Récupérer l'ID de la salle depuis l'URL
    const [password, setPassword] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [isRoomLocked, setIsRoomLocked] = useState(true);

    useEffect(() => {
        // Si le mot de passe est correct, déverrouiller la salle
        if (password === enteredPassword) {
            setIsRoomLocked(false);
        }
    }, [enteredPassword, password]);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredPassword(e.target.value);
    };

    const handleSubmitPassword = () => {
        if (enteredPassword === password) {
            setIsRoomLocked(false); // Déverrouiller la salle
        } else {
            alert("Mot de passe incorrect");
        }
    };

    if (isRoomLocked) {
        return (
            <div className="lock-screen">
                <h2>Entrez le mot de passe pour rejoindre la salle</h2>
                <input
                    type="password"
                    value={enteredPassword}
                    onChange={handlePasswordChange}
                />
                <button onClick={handleSubmitPassword}>Valider</button>
            </div>
        );
    }

    const Game = Client({
        game: SeptetDemi,
        numPlayers: 2,
        board: GameRoomPage,
    });

    return (
        <div>
            <h2>Salle de jeu {id}</h2>
            <GameRoomPage />
        </div>
    );
};

export default GameRoomPage;
