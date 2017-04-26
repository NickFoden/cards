var cards_js = [
        {
            "id":"1",
            "question": "const",
            "answer": "Declares a read-only named constant",
            "reference":"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Basics"
        },
        {
        	"id":"2",
        	"question":"var",
        	"answer":"Declares a variable, optionally initializing it to a value.",
        	"reference":"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Basics"
        }
 ];

function displayCardQuestion(data){
	resultElement += `<div class="card">`;
	resultElement += `<h2>${data.question}</h2>`;
	resultElement += `</div>`

	$('#display-card').append(resultElement);
};


let i = 1;

var currentCard = cards_js[i];

function displayStart(start){
	$("#container").removeClass("hidden");
};

$("#start-button").on('click', function(){
   displayStart();
   displayCardQuestion(currentCard);
};



