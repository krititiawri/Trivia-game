// Declaring array of object to print quiz question and answers
var audio = new Audio("assests/songs/song.mp3");
    audio.play();
var clickSound = new Audio("assests/songs/click.mp3");    
var Quiz = {
  "data": [
    {
      question:"what is captital of India",
      options:["Delhi","shimla","calcutta","punjab"],
      ans:"Delhi",
      images: "assests/images/Delhi.gif",
    },
     {
      question:"what is captital of United States Of America",
      options:["Texas","California","Washington","Arizona"],
      ans:"Washington",
      images:"assests/images/wash.gif",
    },
    {
      question:"what is captital of United Kingdom",
      options:["London","England","Scotland","Wales"],
      ans:"London",
      images:"assests/images/London-GIF.gif"
    }
    ]
};
// Declaring Global variables
var click =0;
// var flag =true;
var intervalId;
var ansClicked;
var count = 30;
var name ;
var index = 0;
var correctAns = 0;
var wrongAns = 0;
var notAns = 0;
var randomQuestion = Quiz.data[index];
var answer = Quiz.data[index].ans;

// To start the game
$(document).ready(function(){
// calling the start screen
initialScreen();
// To start when start buton is clicked
$("body").on("click", ".start-button", function(event){
    audio.pause();
    clickSound.play();
	event.preventDefault();  // added line to test issue on GitHub Viewer
  // Showing the container containg quiz questions
    $(".container").show();
  // Hiding the initial screen
    $(".mainArea").hide();
  // Starting the timer
      run();
  // Calling function to create questions
      createQuestion(randomQuestion);
  // Decrementing the value of counter 
       decrement() ;
      
}); // Closes document.ready function
// Things to be done when the 1of 4 options are pressed

$('body').on("click", 'li',function(event){
     audio.pause();
     clickSound.play();
		var value = $(this).text();
		var answer = Quiz.data[index].ans;
    // if user click equals to the answer the increment the current count and stop the function
       	if(value===answer){
       		correctAns++;
          timerSetWon();
       	}
       	else if(value!=answer){
       		wrongAns++;
          timerSetLoose();
          
       	}
       	else{
       		console.log("Not Answered");
       		notAns++;
       	}
      
	});

});


// Functions to be performed to the starting screen
function initialScreen(){
  startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
  $(".mainArea").html(startScreen);
  var text = $("<p>");
  text.html("<h1>Trivia Game Quiz</h1>");
  $(".mainArea").append(text);
  // $(".mainArea").html(startText);
  $(".container").hide();
}
// To set the timer if player has won
function timerSetWon(){
          $("#picture").html("<h1>Correct Answer</h1>");   
          var pic = $("<img>");
          pic.attr("src",Quiz.data[index].images);
          $("#picture").append(pic);
          console.log("correctansis"+""+correctAns);
           var timeoutID = window.setTimeout(function(){
              $("#picture").html("");
              stop();
           }, [5000]);    
}

// To set the timer if player has Lost
function timerSetLoose(){
          $("#picture").html("<h1>Wrong Answer</h1>");   
          var annsw = $("<div>");
          annsw.html("<h1>")
          $("#picture").html("<h1>correct answer is"+""+Quiz.data[index].ans+"</h1>");
           var timeoutID = window.setTimeout(function(){
              $("#picture").html("");
              stop();
           }, [5000]);    
}
// To create question and answers
function createQuestion(randomQuestion){
   audio.play();
  $("#ques").html(randomQuestion.question);
  for(var i=0;i<randomQuestion.options.length;i++){
    var choices = $("<li>");
    choices.html(randomQuestion.options[i]);
    $("#option").append(choices);
     console.log(randomQuestion.options[i]);
  }

}
// To start the timer
function run() {
      intervalId = setInterval(decrement, 1000);
    }
//  The decrement function.
    function decrement() {
//  Decrease count by 1.
      count--;
//  Show the number in the #show-number tag.
      $("#nw").html("<h2>Time Remmaining" +":"+""+ count +""+"seconds</h2>");
//  Once number hits zero...
      if (count === 0) {
//  ...run the stop function.
        stop();
      }
    }
//  The stop function
    function stop() {
//  Clears our intervalId
//  We just pass the name of the interval
//  to the clearInterval function.
      clearInterval(intervalId);
// Reset the counter
        count = 30;
// increment the index     
        index = index+1;
// if lenegth of array is greater than the value of index change the question as the timer tends to 0
        if(Quiz.data.length > index){
        run();
        $("#option").empty();
        $("#ques").empty();
        $("#nw").empty();
        answer = Quiz.data[index].ans;
        var randomQuestion = Quiz.data[index];
        createQuestion(randomQuestion);        
      }else{
        $("#option").empty();
        $("#ques").empty();
        $("#nw").empty();

        $("#ans").html("<h3>Number of correct Answers" +""+ ":"+""+correctAns+"</h3>");
        var wrong  = $("<div>");
        console.log(answer);
        wrong.html("<h3>Number of Wrong Answers"+""+ ":"+""+wrongAns+"</h3>");
        $("#ans").append(wrong);  
        var noAns = $("<div>");
        noAns.html("<h3>Not Answered"+""+ ":"+""+notAns+"</h3");
        $("#ans").append(noAns);
    // Creating Reset button
        var btn = $("<button>");
        btn.attr('data-name',"reset");
        btn.text("RESET");
        $("#reset").append(btn);
        // listen for reset button click
      $("#reset").on("click", function() {
        index = 0;
        randomQuestion = Quiz.data[index];
        answer = Quiz.data[index].ans;
        run();
        createQuestion(randomQuestion);
        decrement();
        $("#ans").empty();
        $("#reset").hide();

  }); 
        }
}