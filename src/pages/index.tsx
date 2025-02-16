import { useRouter } from "next/router";
import React, { useState } from "react";

const HomePage: React.FC = () => {
    const [roomId, setRoomId] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleJoin = () => {
        // Vérifier si les données sont valides avant de rediriger
        if (roomId && password) {
            router.push(`/room/${roomId}?password=${password}`);
        } else {
            alert("Veuillez entrer un ID de salle et un mot de passe");
        }
    };

    return (
        <div className="container">
            <h1>Bienvenue dans le jeu 7 1/2</h1>
            <div>
                <input
                    type="text"
                    placeholder="ID de la salle"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleJoin}>Rejoindre une salle</button>
            </div>
        </div>
    );
};

export default HomePage;
