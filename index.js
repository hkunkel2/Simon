var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var difficulty = "easy"

addEventListener("keydown", function () {
    if(!started){
        $(".difficulty-btn").fadeOut();
        nextSequence();
        showPattern(gamePattern);
        started = true;
    }
})

function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    gamePattern.push(buttonColors[randomNumber])
    level++;
    $("h1").text("Level " + level)
    return gamePattern;
}

function showPattern(gamePattern) {
    for (let i = 0; i < gamePattern.length; i++) {
        animatedBtn(i);
    }
}

function showLastPatternElement(gamePattern) {
    var color = gamePattern[gamePattern.length-1];
    playSound(color);
    $("#"+color).addClass("pressed").delay(100).queue(function () {
        $(this).removeClass("pressed").dequeue();
    }); 
}

function animatedBtn(i) { setTimeout(function() {
    var color = gamePattern[i];
    playSound(color);
    $("#"+color).addClass("pressed").delay(100).queue(function () {
        $(this).removeClass("pressed").dequeue();
    }); 
    }, 500 * i);   
}



$(".btn").click(function (event) {
    playSound(event.target.id);
    animatedPress(event.target.id);
    userClickedPattern.push(event.target.id);
    checkAnswer(userClickedPattern.length-1);

})

function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatedPress(color) {
    $("#"+color).addClass("pressed").delay(100).queue(function () {
    $(this).removeClass("pressed").dequeue();
    }); 
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        console.log("correct");
        if(userClickedPattern.length === gamePattern.length){
            nextSequence();
            setTimeout(function () {
                if (difficulty == "easy") {
                    showPattern(gamePattern);
                } else {
                  showLastPatternElement(gamePattern);  
                }
            }, 1000);
            userClickedPattern = [];
        }
    } else {
        console.log("wrong");
        var wrongSound = new Audio('sounds/wrong.mp3');
        wrongSound.play();
        $("body").addClass("game-over").delay("200").queue(function () {
            $(this).removeClass("game-over").dequeue();
        })
        $("h1").text("Game Over, Press Any Key to Restart.");
        reset();
    }

}

$(".difficulty-btn").click(function (event) {
    if (event.target.id == "easy") {
        difficulty = "easy";
        $("#easy").addClass("selected");
        $("#hard").removeClass("selected");
    } else {
        difficulty = "hard";
        $("#hard").addClass("selected");
        $("#easy").removeClass("selected");
    }
})

function reset() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    $(".difficulty-btn").fadeIn();
}

