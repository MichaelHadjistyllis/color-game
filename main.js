var colors = generateRandomColors(6);
//possible square color randomizer 
function generateRandomColors(numberOfColors) {
    var arr = [];
    for (var i = 0; i < numberOfColors; i++) {
        arr.push(randomColor());

    }
    return arr;
}
//subfunction of generateRandomColors(), creates random colors
function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

var squares = document.getElementsByClassName("square");
var pickedColor = pickColor();
//random color square assigner
function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

//fill color in divs 
function fillSquare() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
    }
}
//sets target square color
function targeter() {
    var colorDisplay = document.getElementById("color-display");
    colorDisplay.textContent = pickedColor;

}

//add click listeners to squares 
//check for win 
function clickListener() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function() {
            var clickedColor = (this.style.backgroundColor);
            //compare clicked color to target color
            if (clickedColor === pickedColor) {
                messageDisplayRight();
                var resetButton = document.getElementById("reset");
                //play again button upon win
                resetButton.textContent = "Play Again?";
                resetButton.addEventListener("click", function() {
                    var resetButton = document.getElementById("reset");
                    resetButton.textContent = "New Colors";
                });
                changeColor(clickedColor);
            } else {
                this.style.backgroundColor = '#232323';
                messageDisplayWrong();
            }
        });
    }
}
//display message when user is wrong 
function messageDisplayWrong() {
    var messageDisplay = document.querySelector("#message");
    messageDisplay.textContent = "Try Again";


}
//display message when user is right 
function messageDisplayRight() {
    var messageDisplay = document.querySelector("#message");
    messageDisplay.textContent = "Correct!";
}

//change color of squares and header to target color when user is right 
function changeColor(color) {

    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
    var h1 = document.querySelector("h1");
    h1.style.backgroundColor = color;
}

//reset button functionality ("New Colors")
function reset() {
    var hardBtn = document.getElementById('hard');
    var easyBtn = document.getElementById('easy');
    var resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", function() {
        var colorDisplay = document.getElementById("color-display");
        if (hardBtn.classList.contains('selected')) {
            colors = generateRandomColors(6);
        } else {
            colors = generateRandomColors(3);
        }
        pickedColor = pickColor();
        colorDisplay.textContent = pickedColor;
        fillSquare();
        var h1 = document.querySelector("h1");
        h1.style.backgroundColor = "#232323";
        var clearText = document.getElementById("message");
        clearText.textContent = '';

    });
}

//toggles btn css on click 
function toggler() {
    var hardBtn = document.getElementById('hard');
    var easyBtn = document.getElementById('easy');
    easyBtn.addEventListener('click', function() {
        if (this.classList.contains('selected')) {
            this.classList.remove('selected');
        } else {
            this.classList.add('selected');
        }
        if (hardBtn.classList.contains('selected')) {
            hardBtn.classList.remove('selected');
        }
    });
    hardBtn.addEventListener('click', function() {
        if (this.classList.contains('selected')) {
            this.classList.remove('selected');

        } else {
            this.classList.add('selected');
        }
        if (easyBtn.classList.contains('selected')) {
            easyBtn.classList.remove('selected');
        }
    });
}

function difficultyMode(mode) {
    if (mode === 'hard') {
        colors = generateRandomColors(6);
        for (var i = 0; i < squares.length; i++) {
            squares[i].style.display = 'inline';
        }
    } else if (mode === 'easy') {
        colors = generateRandomColors(3);
    }
    pickedColor = pickColor();
    var colorDisplay = document.getElementById("color-display");
    colorDisplay.textContent = pickedColor;
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = 'none';
        }
    }
}

//difficulty button listeners
function easyButton() {
    var easyBtn = document.getElementById("easy");
    var hardBtn = document.getElementById('hard');


    easyBtn.addEventListener("click", function() {
        difficultyMode('easy');

    });

}

function hardButton() {
    var hardBtn = document.getElementById("hard");
    var easyBtn = document.getElementById('easy');


    hardBtn.addEventListener("click", function() {
        difficultyMode('hard');

    });
}



//call button functions 
function difficulty() {
    hardButton();
    easyButton();
}

//main function calls subfunctions 
function main() {
    fillSquare();
    targeter();
    clickListener();
    reset();
    difficulty();
    toggler();




}
//main function called on load
window.onload = main;