
$(document).ready(function(){
	
    var guessNumber = 0;
    var lastGuess = "";
    var secretNumber = Math.floor(Math.random()*101);
    var currentGuess = "";
    
    
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});
    
    /*--- User submits (button or enter) a guess ---*/
    
    $('form').submit(function(event){
        
        currentGuess = Number($('#userGuess').val());
        if (validateGuess(currentGuess)) {
           guessNumber++;
            $('#count').text(guessNumber);
            $('ul#guessList').append("<li>" + $('#userGuess').val() + "</li>");

            var guessDelta = Math.abs(currentGuess - secretNumber);
            var lastDelta = Math.abs(lastGuess - secretNumber);

            console.log("Guessed: " + currentGuess + ".  Delta is: " + guessDelta); 
            if (guessNumber == 1) {
                if (guessDelta == 0) {
                    $('#feedback').text("Nice. You guessed it!");
                } else if (guessDelta < 10) {
                    $('#feedback').text("You're steaming hot!");
                } else if (guessDelta < 50) { 
                    $('#feedback').text("You're warm.");
                } else {
                    $('#feedback').text("Sorry. Not even close.");  
                }
            } else if (guessDelta == 0) {
                $('#feedback').text("Nice. You guessed it!");
            } else if (guessDelta > lastDelta) {
                $('#feedback').text("You're getting colder.");
            } else if (guessDelta < lastDelta) {
                $('#feedback').text("You're getting warmer.");
            }
            
            $('#userGuess').val("");
            lastGuess = currentGuess;
        }
        event.preventDefault();
    });
    
    $(".new").click(function(){
        newGame();
    });
    
    function validateGuess(guess){
        if (isNaN(guess)) {
            $('#feedback').text("Please enter a number between 0 and 100.");
        } else if (guess !== parseInt(guess, 10)) {
            $('#feedback').text("Please enter an integer.");
        } else if ((guess > 100) || (guess < 0)) {
           $('#feedback').text("Please enter a number between 0 and 100.");
        } else {
            return true;
        }
    }
    
    function howClose(delta) {
           
    }
    
    function newGame(){
        guessNumber = 0;
        lastGuess = "";
        currentGuess = "";
        secretNumber = Math.floor(Math.random()*101);
        $('ul#guessList').empty();
        $('#count').text("0");
        $('#feedback').text("Make your Guess!");
        console.log("New Game started. Secret number is: " + secretNumber);
    }

});


