import GameSummary from "./GameSummary"

export default function GamesContainer({games}){

    const gameSummaries = games.map(game => 
        <GameSummary game={game} key={game.id}/>
    )

    return (
        <div>
            <h2>Your Saved Games:</h2>
            <div className="games-wrapper">
            {gameSummaries}
            </div>
        </div>
    )
}