import { Ctx, Game } from "boardgame.io";

export interface GameState {
    deck: number[]; // Le paquet de cartes restantes
    players: { [key: number]: { hand: number[]; score: number } }; // Mains et scores des joueurs
    currentPlayer: string; // Joueur actif
}



export const SeptetDemi: Game<GameState> = {
    name: "septetdemi",

    setup: ({ ctx }: { ctx: Ctx }): GameState => {
        const deck = generateDeck();
        return {
            deck,
            players: Object.fromEntries(
                ctx.playOrder.map((id) => [id, { hand: [], score: 0 }])
            ),
            currentPlayer: ctx.currentPlayer,
        };
    },

    moves: {
        drawCard: ({ G, ctx }: { G: GameState; ctx: Ctx }) => {
            if (G.deck.length === 0) return;

            const player = G.players[Number(ctx.currentPlayer)];
            const card = G.deck.pop()!; // Retire une carte du paquet
            player.hand.push(card);
            player.score += card;

            // Vérifier si le joueur dépasse 7.5
            if (player.score > 7.5) {
                // Finir le tour du joueur
                G.currentPlayer = ctx.playOrder[(ctx.playOrderPos + 1) % ctx.numPlayers];
            }
        },

        stay: ({ G, ctx }: { G: GameState; ctx: Ctx }) => {
            G.currentPlayer = ctx.playOrder[(ctx.playOrderPos + 1) % ctx.numPlayers];
        },
    },

    turn: {
        activePlayers: { all: 'all' },
        order: {
            first: () => 0,
            next: ({ G, ctx }: { G: GameState, ctx: Ctx }) => (ctx.playOrderPos + 1) % ctx.numPlayers,
        },
    },

    endIf: ({ G, ctx }: { G: GameState; ctx: Ctx }) => {
        const allStayed = Object.values(G.players).every(
            (p) => p.score > 7.5 || p.hand.length > 0
        );

        if (allStayed) {
            // Trouver le gagnant le plus proche de 7.5
            const winner = Object.entries(G.players)
                .filter(([_, p]) => p.score <= 7.5)
                .sort((a, b) => b[1].score - a[1].score)[0]?.[0];

            return { winner };
        }
    },
};

function generateDeck(): number[] {
    const values = [0.5, 1, 2, 3, 4, 5, 6, 7]; // Valeurs possibles
    const deck = values.flatMap((v) => Array(4).fill(v)); // 4 cartes de chaque
    return shuffle(deck);
}

function shuffle<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
}
