var clicks = 0;
var totalScore = 0;
let playerCount = 100
const points = {
    70: {response: 1}, // 70 and 75
    60: {response: 2}, // 60 and 65
    55: {response: 5}, 
    45: {response: 2}, // 45 and 50
    20: {response: 1}, // 20,25,30,35,40
    17: {response: 1}, // 17,18,19
    15: {response: 2},
    14: {response: 3},
    13: {response: 1},
    12: {response: 1},
    11: {response: 1},
    8: {response: 2}, // 8, 10
    6: {response: 4}, 
    5: {response: 3}, 
    4: {response: 6}, 
    3: {response: 3}, 
    2: {response: 5}, 
    1: {response: 10}
}

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
    localStorage.setItem('totalScore', totalScore);
    const d = new Date();
    
    var ul = document.getElementById("gameHistory");
    var li = document.createElement("li");
    var player = document.getElementById("player").value;   
    var lastscore = totalScore.toString();
    var parms = `${d.toLocaleDateString()} | ${player} | ${totalScore.toString()}`

    // li.appendChild(document.createTextNode(parms));
    // ul.appendChild(li);
    console.log(player);
    
    updateGameHistory(d.toLocaleDateString(), player, lastscore);

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
            totalScore += 1;
            break;
        case 70:
            totalScore += 1;
            break;
        case 65:
            totalScore += 2;
            break;
        case 60:
            totalScore += 2;
            break;
        case 55:
            totalScore += 5;
            break;
        case 50:
            totalScore += 1;
            break;
        case 40:
            totalScore += 2;
            break;
        case 35:
            totalScore += 2;
            break;
        case 30:
            totalScore += 2;
            break;
        case 25:
            totalScore += 2;
            break;
        case 20:
            totalScore += 2;
            break;
        case 19:
            totalScore += 1;
            break;
        case 18:
            totalScore += 1;
            break;
        case 17:
            totalScore += 1;
            break;
        case 15:
            totalScore += 2;
            break;
        case 14:
            totalScore += 3;
            break;
        case 13:
            totalScore += 3;
            break;
        case 12:
            totalScore += 1;
            break;
        case 11:
            totalScore += 1;
            break;
        case 10:
            totalScore += 2;
            break;
        case 8:
            totalScore += 2;
            break;
        case 7:
            totalScore += 1;
            break;
        case 6:
            totalScore += 4;
            break;
        case 5:
            totalScore += 3;
            break;
        case 4:
            totalScore += 6;
            break;
        case 3:
            totalScore += 3;
            break;
        case 2:
            totalScore += 5;
            break;
        case 1:
            totalScore += 10;
            break;

    }

    document.getElementById("totalScore").innerHTML = totalScore.toString();
}

function updateGameHistory(pointsDate, player, totalScore) {
    var table = document.getElementById("table");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = player;
    cell2.innerHTML = pointsDate;
    cell3.innerHTML = totalScore;
  }