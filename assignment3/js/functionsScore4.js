const game = {
    plays: "red",
    moves: 0,
    cells: [],
    winner: false
};

const wins = {
    redwins: 0,
    yellowins: 0,
    draws: 0
};

var start;
let s = 0;

window.onload = function () {
    disableAll();
    start = Date.now();
    var but = document.getElementById('play-game');
    but.addEventListener("click", play);
}

function play() {

    for (var j = 0; j < 7; j++) {
        document.getElementById('p' + 5 + '_' + j).disabled = false;
        document.getElementById('p' + 5 + '_' + j).style.background = 'white';
        document.getElementById('p' + 5 + '_' + j).className = "";
    }
    newGame();
}

function disableAll() {
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 7; j++) {
            document.getElementById('p' + i + '_' + j).disabled = true;
            document.getElementById('p' + i + '_' + j).style.background = 'grey';
            document.getElementById('p' + i + '_' + j).className = "";
        }
    }
}

function newGame() {
    game.moves = 0;
    game.winner = false;
    pieLoad();

    for (var i = 0; i < 6; i++) {
        game.cells[i] = [null, null, null, null, null, null, null];
    }

    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 7; j++) {

            document.getElementById('p' + i + '_' + j).style.background = 'grey';
            document.getElementById('p' + i + '_' + j).disabled = true;
            document.getElementById('p' + i + '_' + j).className = "";
        }
    }
    document.getElementById('play-game').innerHTML = "Play Again!";
    document.getElementById('play-game').disabled = true;

    document.getElementById('inner-message').innerHTML = "";
    document.getElementById('inner-message').innerHTML += "Game starts! First player is: " + game.plays + "<br>";
    document.getElementById('inner-message').innerHTML += "Wins so far-> red: " + wins.redwins + ", yellow: " + wins.yellowins + ", draws: " + wins.draws + "<br>";
}


function button_press(x, y) {
    updatePage(x, y);
    var seconds = 0;
    seconds = Math.floor((Date.now() - start) / 1000);
    document.getElementById('inner-inner-message').innerHTML = "";
    document.getElementById('inner-inner-message').innerHTML = "Remaining cells " + (42 - game.moves) + ". Time it took = " + seconds + " sec <br>";
    this.hasPlayerWon(x, y);
    if ((game.winner === false) && (isDraw() === false) && (isValidMove(x, y) === true))
        changePlayerTurn();
}

function updatePage(x, y) {
    document.getElementById('p' + x + '_' + y).style.background = game.plays;
    document.getElementById('p' + x + '_' + y).disabled = true;
    if ((x - 1) >= 0) {
        document.getElementById('p' + (x - 1) + '_' + y).disabled = false;
        document.getElementById('p' + (x - 1) + '_' + y).style.background = 'white';
    }
    game.moves++;

    if (isValidMove(x, y) === true) {
        document.getElementById('inner-inner-message').innerHTML = "Move " + game.moves + ". Player " + getPlayerTurn() + ".<br>";
    }
}

function isValidMove(x, y) {
    if (document.getElementById('p' + x + '_' + y).disabled === false)
        return false;
    else
        return true;
}

function isDraw() {
    if (game.moves === 42) {
        document.getElementById('inner-message').innerHTML += "Draw";
        wins.draws++;
        document.getElementById('play-game').disabled = false;

        return true;
    }
    else
        return false;
}

function getPlayerTurn() {
    if (game.plays == 'red')
        return 'red';
    else
        return 'yellow';
}

function changePlayerTurn() {
    start = Date.now();
    if (game.plays == 'red')
        game.plays = 'yellow';
    else
        game.plays = 'red';
    document.getElementById('inner-inner-message').innerHTML += "It's " + game.plays + "'s turn." + "<br>";
}


function disableButtons() {
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 7; j++) {
            document.getElementById('p' + i + '_' + j).disabled = true;
        }
    }
}

function horizontalWin(i) {
    for (var row = 0; row < 6; row++) {
        for (var col = 0; col < 4; col++) {
            var x = document.getElementById('p' + row + '_' + col).style.background;
            var y = document.getElementById('p' + row + '_' + (col + 1)).style.background;
            var z = document.getElementById('p' + row + '_' + (col + 2)).style.background;
            var w = document.getElementById('p' + row + '_' + (col + 3)).style.background;

            if ((x === y) && (x === z) && (x === w) && (x !== 'white') && (x !== 'grey') && (x !== undefined)) {
                document.getElementById('inner-message').innerHTML += "Winner Horizontally Player: " + game.plays + " with " + game.moves + " moves";

                var a = document.getElementById('p' + row + '_' + col);
                var b = document.getElementById('p' + row + '_' + (col + 1));
                var c = document.getElementById('p' + row + '_' + (col + 2));
                var d = document.getElementById('p' + row + '_' + (col + 3));
                blinkType(a, b, c, d, game.plays);
                return true;
            }
        }
    }
    return false;
}

function verticalWin(y) {
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 3; row++) {
            var x = document.getElementById('p' + row + '_' + col).style.background;
            var y = document.getElementById('p' + (row + 1) + '_' + col).style.background;
            var z = document.getElementById('p' + (row + 2) + '_' + col).style.background;
            var w = document.getElementById('p' + (row + 3) + '_' + col).style.background;

            if ((x === y) && (x === z) && (x === w) && (x !== 'white') && (x !== 'grey') && (x !== undefined)) {
                document.getElementById('inner-message').innerHTML += "Winner Vertically Player: " + game.plays + " with " + game.moves + " moves";

                var a = document.getElementById('p' + row + '_' + col);
                var b = document.getElementById('p' + (row + 1) + '_' + col);
                var c = document.getElementById('p' + (row + 2) + '_' + col);
                var d = document.getElementById('p' + (row + 3) + '_' + col);
                blinkType(a, b, c, d, game.plays);
                return true;
            }
        }
    }
    return false;
}


function diagonialDWin() {
    for (let col = 0; col < 4; col++) {
        for (let row = 0; row < 3; row++) {
            var x = document.getElementById('p' + row + '_' + col).style.background;
            var y = document.getElementById('p' + (row + 1) + '_' + (col + 1)).style.background;
            var z = document.getElementById('p' + (row + 2) + '_' + (col + 2)).style.background;
            var w = document.getElementById('p' + (row + 3) + '_' + (col + 3)).style.background;

            if ((x === y) && (x === z) && (x === w) && (x !== 'white') && (x !== 'grey') && (x !== undefined)) {
                document.getElementById('inner-message').innerHTML += "Winner Diagonally(Downwards) Player: " + game.plays + " with " + game.moves + " moves";

                var a = document.getElementById('p' + row + '_' + col);
                var b = document.getElementById('p' + (row + 1) + '_' + (col + 1));
                var c = document.getElementById('p' + (row + 2) + '_' + (col + 2));
                var d = document.getElementById('p' + (row + 3) + '_' + (col + 3));
                blinkType(a, b, c, d, game.plays);

                return true;
            }
        }
    }
    return false;
}

function diagonialUWin() {
    for (let col = 0; col < 4; col++) {
        for (let row = 5; row > 2; row--) {
            var x = document.getElementById('p' + row + '_' + col).style.background;
            var y = document.getElementById('p' + (row - 1) + '_' + (col + 1)).style.background;
            var z = document.getElementById('p' + (row - 2) + '_' + (col + 2)).style.background;
            var w = document.getElementById('p' + (row - 3) + '_' + (col + 3)).style.background;

            if ((x === y) && (x === z) && (x === w) && (x !== 'white') && (x !== 'grey') && (x !== undefined)) {
                document.getElementById('inner-message').innerHTML += "Winner Diagonally(Upwards) Player: " + game.plays + " with " + game.moves + " moves";

                var a = document.getElementById('p' + row + '_' + col);
                var b = document.getElementById('p' + (row - 1) + '_' + (col + 1));
                var c = document.getElementById('p' + (row - 2) + '_' + (col + 2));
                var d = document.getElementById('p' + (row - 3) + '_' + (col + 3));
                blinkType(a, b, c, d, game.plays);

                return true;
            }
        }
    }
    return false;
}

function hasPlayerWon(x, y) {
    if (horizontalWin(x) == true || verticalWin(y) == true || diagonialDWin() == true || diagonialUWin() == true) {
        game.winner = true;
        disableButtons();
        document.getElementById('inner-inner-message').innerHTML = "";
        document.getElementById('play-game').disabled = false;
        if (game.plays == "red") {
            wins.redwins++;
        }
        else
            wins.yellowins++;
    }
}

function blinkType(a, b, c, d, color) {
    if (color === "red") {
        a.className = "blinking_red";
        b.className = "blinking_red";
        c.className = "blinking_red";
        d.className = "blinking_red";
    }
    else if (color === "yellow") {
        a.className = "blinking_yel";
        b.className = "blinking_yel";
        c.className = "blinking_yel";
        d.className = "blinking_yel";
    }
}

function pieLoad() {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Task', 'Wins in game'],
            ['Draws', wins.draws],
            ['Red Player wins', wins.redwins],
            ['Yellow Player wins', wins.yellowins]
        ]);

        var options = {
            title: 'Player wins',
            is3D: true,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
    }
}