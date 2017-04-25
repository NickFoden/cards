var cards_js = {
	"cards": [
        {
            "id": "1",
            "card_q": "const",
            "card_a": "Declares a read-only named constant"
            "reference":"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Basics"
        },
        {
        	"id":"2",
        	"card_q":"var",
        	"card_a":"Declares a variable, optionally initializing it to a value.",
        	"reference":"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Basics"
        }
 ]
};

function displayCard(data){
	resultElement += `<div class="card">`;
	resultElement += `<h2>${data.card_q}</h2>`;
	resultElement += `</div>`

	$('.display-card').append(resultElement);
};

let i = 1;

function currentCard(cards_js){
	return cards_js.cards[i];
};

$("#start-button").on('click', function(){
   displayStart();
   displayCard(currentCard);
};

function displayStart(start){
	$("#container").removeClass("hidden");
};

