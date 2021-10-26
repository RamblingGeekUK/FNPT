const client = new faunadb.Client({
    secret:  '', // [REMOVED],
    timeout: 30,
    domain: 'db.eu.fauna.com',
    scheme: 'https'
})

let q = faunadb.query
let clicks = 0;
let totalScore = 0;
let playerCount = 100

let savedPlayer = localStorage.getItem('player');
createIndex();

function getReaminingPlayers(){
    playerCount -= 1;
    if (playerCount<=0)
    {
        document.getElementById("playerAdd").disabled = true;
    }
    else {
        document.getElementById("players").innerHTML = playerCount;        
    }
    computeScore(parseInt(playerCount));
}

function saveGame(){
    const d = new Date();    
    let player = document.getElementById("player").value;   
    let lastscore = totalScore.toString();

    localStorage.setItem('totalScore', totalScore);
    localStorage.setItem('player', player);
    
    updateGameHistory(d.toLocaleDateString(), player, lastscore);
    commit(player, lastscore);
    resetForm();
}

function resetForm() {
    totalScore = 0;
    playerCount = 100
    document.getElementById("totalScore").innerHTML = totalScore;
    document.getElementById("players").innerHTML = playerCount.toString();
    //document.getElementById("mainform").reset();
}

function computeScore(remainingPlayers) {
        
    switch(remainingPlayers)
    {        
        case 75:
        case 70:
        case 50:
        case 45:
        case 19:
        case 18:
        case 17:
        case 13:
        case 12:
        case 11:
        case 7:
            totalScore += 1;
            break;
        case 65:
        case 60:
        case 40:
        case 35:
        case 30:
        case 25:
        case 20:
        case 15:
        case 10:
        case 8:
            totalScore += 2;
            break;       
        case 55:        
            totalScore += 5;
            break;
        case 14:
        case 5:
        case 3:
            totalScore += 3;
            break;        
        case 6:
            totalScore += 4;
            break;
        case 4:
            totalScore += 6;
            break;
        case 1:
            totalScore += 10;
            break;

    }

    document.getElementById("totalScore").innerHTML = totalScore.toString();
}

function updateGameHistory(pointsDate, player, totalScore) {
    let table = document.getElementById("table");
    let row = table.insertRow(1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.innerHTML = player;
    cell2.innerHTML = pointsDate;
    cell3.innerHTML = totalScore;
  }



function commit(player, score) {
    let createP = client.query(
        q.Create(
          q.Collection('game_history'),
          { data: { player: player, score: score } }
        )
      )
  }

  function createIndex() {
    client.query(
        q.CreateIndex({
          name: 'game_history_by_score',
          source: q.Collection('game_history'),
          terms: [{ field: ['score'] }],
        })
      )
      .then((ret) => console.log(ret))
      .catch((err) => console.error('Error: %s', err))
  }