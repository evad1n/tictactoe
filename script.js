let tiles = document.querySelectorAll(".tile");
let winner = document.querySelector("#winner");
let again = document.querySelector("#again");
let turn = document.querySelector("#turn");

let xTurn = true;
let playing = true;
let turnCounter = 0;

tiles.forEach(tile => {
    tile.onclick = play;
});

// Wipe board and restart
again.onclick = function () {
    tiles.forEach(tile => {
        tile.innerHTML = "";
        tile.classList.remove("x");
        tile.classList.remove("o");
    });
    playing = true;
    xTurn = true;
    turn.innerHTML = "X";
    winner.innerHTML = "";
    again.style.display = "none";
    turnCounter = 0;
};

function play(x) {
    if (playing && x.target.innerHTML == "") {
        xTurn ? x.target.innerHTML = "X" : x.target.innerHTML = "O";
        xTurn ? x.target.classList.add("x") : x.target.classList.add("o");
        turnCounter++;

        let winChar = bitwiseWinner();
        console.log(winChar);

        if (winChar == "X") {
            winner.innerHTML = "X Wins!";
            playing = false;
            again.style.display = "block";
        }
        else if (winChar == "O") {
            winner.innerHTML = "O Wins!";
            playing = false;
            again.style.display = "block";
        }
        else if (winChar == "tie") {
            winner.innerHTML = "Nobody Wins!";
            playing = false;
            again.style.display = "block";
        }
        else {
            winner.innerHTML = "";
        }

        xTurn = !xTurn;
        xTurn ? turn.innerHTML = "X" : turn.innerHTML = "O";
    }
}


//Possible 3 in a row combinations
let winSet = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],

    [1, 5, 9],
    [7, 5, 3],

    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
];

//Check win condition
function isWin() {
    let xTiles = [];
    let oTiles = [];

    tiles.forEach(function (tile, i) {
        if (tile.innerHTML == "X") {
            xTiles.push(i + 1);
        }
        else if (tile.innerHTML == "O") {
            oTiles.push(i + 1);
        }
    });

    for (let i = 0; i < winSet.length; i++) {
        if (xTiles.includes(winSet[i][0]) && xTiles.includes(winSet[i][1]) && xTiles.includes(winSet[i][2])) {
            return "X";
            break;
        }

        if (oTiles.includes(winSet[i][0]) && oTiles.includes(winSet[i][1]) && oTiles.includes(winSet[i][2])) {
            return "O";
            break;
        }
    }

    if (turnCounter >= 9)
        return "tie";

    return "none";
}


//Binary 3 in a row combinations
let bitSet = [
    '100100100',
    '010010010',
    '001001001',
    '111000000',
    '000111000',
    '000000111',
    '100010001',
    '001010100'];

//bitwise win condition
function bitwiseWinner() {
    let set = "";

    for (let i = 0; i < tiles.length; i++) {
        xTurn ?
            (tiles[i].innerHTML == "X" ? set += "1" : set += "0") :
            (tiles[i].innerHTML == "O" ? set += "1" : set += "0");
    }

    set = Number(set);

    for (let i = 0; i < bitSet.length; i++) {
        let j = (parseInt(set, 2) & parseInt(bitSet[i], 2) >>> 0).toString(2);

        if (parseInt(j, 2) === parseInt(bitSet[i], 2)) {
            return xTurn ? "X" : "O";
        }
    }

    if (turnCounter >= 9)
        return "tie";

    return "none";
}
