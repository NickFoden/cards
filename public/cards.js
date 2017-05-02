//const {PORT, DATABASE_URL} = require('./server.js');
//const {card} = require('./models.js');

var cards_js = [
        {
          "id":"1",
          "question":"const",
          "answer": "Declares a read-only named constant",
          "example": "const id = 15",
          "reference":"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Basics"
        },
        {
        	"id":"2",
        	"question":"var",
        	"answer":"Declares a variable, optionally initializing it to a value.",
          "example":"var x = 5",
        	"reference":"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Basics"
        },
         {
          "id":"3",
          "question":"indexOf() method",
          "answer":"Returns the first index at which a given element can be found in the array, or -1 if it is not present.",
          "example": "var array = [2, 9, 9] array.indexOf(2) / 0  array.indexOf(7)  / -1",
          "reference":"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Basics"
        }
 ];

let used = [];


var getCard = () => {
  let notUsed = true;
  while (notUsed && used.length < cards_js.length) {
    var index = Math.floor(Math.random() * cards_js.length);
    if (used.indexOf(index) === -1) {
      used.push(index);
      notUsed = false;
    }
  }
  if ((used.length - 1) === cards_js.length) {
    return false;
  } else {
    return cards_js[index];
  }
};

var currentCard = getCard(cards_js);
 
function displayCardQuestion(data){
	let resultElement = 
    `<div class="display-card-question">
      <h2>${data.question}</h2>
      </div><button id="answer-button">Flip It</button>`;

	$('#display').html(resultElement);
};

function displayCardAnswer(data){
    let resultElement = 
      `<div class="display-card-answer">
      <h2><a href="${data.reference}" target="_blank">${data.answer}</a></h2>
      </div><button id="next-card">Next</button>`;
    
    $('#answer-button').hide();
    $('#display').append(resultElement);
};

function displayEnd(data){
  let resultElement = `<div class="end-card">You have reached the end</div>
                        <button id="start-over" onclick="location.href='start.html'">Start over</button>
                        <button id="index" onclick="location.href='index.html'">Index</button>`;

   $('#display').html(resultElement);  
};

function displaySummary(data){
 for (i = 0; i <= data.length; i++){
  let summary = `<li>${data[i].question}</li>`;

  $('.cards-summary').append(summary);
 }
}

$(document).on('click', "#start-button", function(){
    $(".start-text").hide();
    displayCardQuestion(currentCard);
});


$(document).on('click', "#answer-button", function(){
    displayCardAnswer(currentCard);
});

$(document).on('click', "#next-card", function(){
    currentCard = getCard(cards_js);
    if (currentCard) {
      displayCardQuestion(currentCard);
    }
    else {
      displayEnd();
    }
    
});

$(document).on('submit', "#new-card-form", function(e){
    e.preventDefault();
    var newCard ={};

    newCard.id = (cards_js.length + 1)
    newCard.question = $("#question").val();
    newCard.answer = $("#answer").val();
    newCard.example = $("#example").val();
    newCard.reference = $("#reference").val();

    console.log(newCard);

    cards_js.push(newCard);
});

$(document).on('click', "#summary-button", function(){
  $('#sumary-button').addClass('.hidden');
  displaySummary(cards_js);
});
/*$(document).on('click', "#start-over", function(){
  let used= [];
    displayCardQuestion(currentCard);

});*/


/*let Cards = {};

Cards.create = function(card){
  //Add submit and then method to make cards

};*/

//END