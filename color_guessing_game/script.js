var numSquares = 6;
//create an array of random colors
var colors = [];
//pick any color as correct
var pickedColor;
//get all color sqaures in list variable
var squares = document.querySelectorAll(".square");
//get colorDisplay from html page in variable
var colorDisplay = document.getElementById("colorDisplay");
//get messsage id in variable
var messsage = document.querySelector("#message");
var h1 = document.querySelector("h1");
//get change color button in variable
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    //mode buttons event listeners
    setupModeButtons();
    //loop through each square and assign them colors
    setupSquares();
    reset();
}

function setupModeButtons() {
    for(var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");    
            if(this.textContent === "Easy") {
                numSquares = 3;
            } else {
                numSquares = 6;
            }
            reset();
        });
    }
}

function setupSquares() {
    for(var i = 0; i < squares.length; i++) {    
        //add click listeners to sqaures
        squares[i].addEventListener("click", function() {
        //grab clicked color
        var clickedColor = this.style.backgroundColor;
        //compare clickedColor to pickedColor
        if(clickedColor === pickedColor) {
            messsage.textContent =  "Correct!";
            changeColor(pickedColor);
            resetButton.textContent = "Play Again?";
            h1.style.backgroundColor = clickedColor;
        } else {
            messsage.textContent = "Try Again!";
            this.style.backgroundColor = "#232323";
        }
      });
     }
}

function reset() {
    //generate all new random colors
    colors = generateRandomColor(numSquares);
    //pick one color from array
    pickedColor = pickColor();    
    //change colorDisplay to match new color
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "Change Colors";
    messsage.textContent = "";
    //change colors of the squares
    for(var i = 0; i < squares.length; i++) {
        if(colors[i]) {
        squares[i].style.backgroundColor = colors[i];
        squares[i].style.display = "block";            
        } else {
        squares[i].style.display = "none";
        }
    }  
    h1.style.backgroundColor = "steelblue"; 
}

resetButton.addEventListener("click", function() {
    reset();  
});

function changeColor(color) {
    //loop through each sqaure to change color
    for(var i = 0; i < squares.length; i++) {
        //change the color of all squares to correctColor
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random =  Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColor(num) {
    //create an empty array
    var arr = [];
    //repeat num times to push random color to array
    for(var i = 0; i < num; i++) {
        //generate randomColors and push into arr
        arr.push(randomColor());
    }
    //return array
    return arr;
}

function randomColor() {
    //pick randrom values of colors from 0 to 255
var r = Math.floor(Math.random() * 256);
var g = Math.floor(Math.random() * 256);
var b = Math.floor(Math.random() * 256);
return "rgb(" + r + ", " + g + ", " + b + ")";
}
