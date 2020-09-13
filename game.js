var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(document).keydown(function() {
    if (!gameStarted) {
        nextSequence();
    }
});

function nextSequence() {
    gameStarted = true;
    var randomNumber = Math.floor(Math.random() * 3);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level += 1;
    $("h1").text("Level " + level);
}

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
    var colorSound = new Audio("sounds/" + name + ".mp3");
    colorSound.play();
}

function animatePress(currentColor) {
    var currentButton = $("#" + currentColor);
    currentButton.addClass("pressed");

    setTimeout(function() {
        currentButton.removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
    } else {
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");}, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    if (currentLevel == gamePattern.length - 1) {
        userClickedPattern = [];
        setTimeout(nextSequence, 1000);
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
}