// 2 points per kill
// -0.5 points per death
// 1.5 points per assist
// 0.01 points per creep kill
// 2 points for a triple kill
// 5 points for a quadra kill (doesn't also count as a triple kill)
// 10 points for a penta kill (doesn't also count as a quadra kill)
// 2 points if a player attains 10 or more assists or kills in a game (this bonus only applies once)

function calculatePlayerScore(stats) {
    let kills = stats.kills;
    let deaths = stats.deaths;
    let assists = stats.assists;
    let creepKills = stats.totalMinionsKilled;
    let tripleKills = stats.tripleKills;
    let quadraKills = stats.quadraKills;
    let pentaKills = stats.pentaKills;

    let tenTakedownsBonus = 0;
    if (assists > 10 || kills > 10) {
        tenTakedownsBonus = 2;
    }

    let playerScore = 0;

    playerScore += kills * 2;
    playerScore += deaths * -0.5;
    playerScore += assists * 1.5;
    playerScore += creepKills * 0.01;
    playerScore += tripleKills * 2;
    playerScore += quadraKills * 5;
    playerScore += pentaKills * 10;
    playerScore += tenTakedownsBonus;

    return playerScore
}

module.exports = { calculatePlayerScore };