$(document).ready(function(){
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
	  }
		]
};
console.log(Quiz.data[1].options[0]);
// var randomQuestion = Quiz.data[Math.round(Math.random())];
// console.log(randomQuestion);
var ansClicked;
var count = 25;
var name ;
var index = 0;
var correctAns = 0;
var wrongAns = 0;
var notAns = 0;
var randomQuestion = Quiz.data[index];
var answer = Quiz.data[index].ans;
console.log(answer);
function initialScreen(){
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
  // $(".container").html("start");
  // startText = "<p> start</p>";
  var text = $("<p>");
  text.html("<h1>Start Quiz</h1>");
  $(".mainArea").append(text);
  // $(".mainArea").html(startText);
	$(".container").hide();
}
initialScreen();

$("body").on("click", ".start-button", function(event){
	event.preventDefault();  // added line to test issue on GitHub Viewer
	// clickSound.play();
	
    $(".container").show();
    $(".mainArea").hide();
    // run();;
       // var qyes = randomQuestion.question[index];
       // var randomQuestion = Quiz.data[index];/
       createQuestion(randomQuestion.question[index]);
       // createQuestion(randomQuestion);
       decrement() ;
       stop();
       startScreen.hide();
 
}); // Closes start-button click
function run() {
      intervalId = setInterval(decrement, 1000);
      createQuestion(randomQuestion);
    }
    //  The decrement function.
    function decrement() {
      //  Decrease number by ne.
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
      //  Alert the user that time is up.
        // alert("Time Up!");
      	count = 25;
      	index = index+1;

      	console.log(Quiz.data.length );
      	console.log(index);

      	if(Quiz.data.length > index){
      		console.log("Inside.....");
      	run();
      	$("#option").empty();
      	$("#ques").empty();
      	$("#nw").empty();
        answer = Quiz.data[index].ans;
        console.log(answer);
      	var randomQuestion = Quiz.data[index];
      	createQuestion(randomQuestion);
      	console.log(index);
      	
      }else{
      	$("#option").empty();
      	$("#ques").empty();
      	$("#nw").empty();

      	$("#ans").text("Number of correct Answers"+""+ ":"+""+correctAns);
      	var wrong  = $("<div>");
        console.log(answer);
      	wrong.html("Number of Wrong Answers"+""+ ":"+""+wrongAns+"");
      	$("#ans").append(wrong);	
      	var noAns = $("<div>");
      	noAns.html("Not Answered"+""+ ":"+""+notAns);
      	$("#ans").append(noAns);
        var btn = $("<button>");
        btn.attr('data-name',"reset");
        btn.text("RESET");
        $("#reset").append(btn);
        // index = 0;
        // listen for reset button click
      $("#reset").on("click", function() {
        // createQuestion(randomQuestion[index]);
         // location.href=location.href;
          createQuestion(Quiz.data);
       // createQuestion(randomQuestion);
       decrement() ;
       stop();
       startScreen.hide();
  }); 
      	}
    }
   console.log(index); 
    //  Execute the run function.
    run();


function createQuestion(randomQuestion){

  $("#ques").html(randomQuestion.question);

  for(var i=0;i<randomQuestion.options.length;i++){
  	var choices = $("<li>");
  	choices.html(randomQuestion.options[i]);
  	$("#option").append(choices);
  	 console.log(randomQuestion.options[i]);


	}
	 // clearInterval(intervalId);
}

$('body').on("click", 'li',function(event){
	// $('li').click(function(){
		// alert("Hi");
		
		// alert("hi");
		var value = $(this).text();
		var answer = Quiz.data[index].ans;
console.log(value);
		 // index = index+1;
		console.log(answer);
       	// console.log(value);
       	if(value===answer){
       		console.log("correct");
       		correctAns++;
          // console.log(Quiz.data[index].images);
          timerSet();
       		
          // $("#picture").hide();
       	}
       	else if(value!=answer){
       		console.log("wrong answer");
       		wrongAns++;
       		stop();
       	}
       	else{
       		console.log("Not Answered");
       		notAns++;
       	}
      
	});

function timerSet(){
          $("#picture").html("correct");   
          var pic = $("<img>");
          pic.attr("src",Quiz.data[index].images);
          // pic.html(randomQuestion.images);
          // pic.html()
          console.log(randomQuestion.images);

          $("#picture").append(pic);
          // $("#picture").html("<img" +randomQuestion.images+"/>");
          console.log("correctansis"+""+correctAns);
           var timeoutID = window.setTimeout(function(){
              $("#picture").html("");
              stop();
           }, [5000]);    
}
});
