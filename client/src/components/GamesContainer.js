import GameSummary from "./GameSummary"

export default function GamesContainer({games}){

    const gameSummaries = games.map(game => 
        <GameSummary game={game} key={game.id}/>
    )

    return (
        <div>
            <h2>Your Games:</h2>
            {gameSummaries}
        </div>
    )
}