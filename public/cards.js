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
  if (used.length === cards_js.length) {
    return false;
  } else {
    return cards_js[index];
  }
};

var currentCard = getCard(cards_js);

function displayCardQuestion(data){
	let resultElement = 
    `<div class="display-card">
      <h2>${data.question}</h2>
      <button id="answer-button">Flip It</button>
    </div>`;

	$('#display').html(resultElement);
};

function displayCardAnswer(data){
    let resultElement = 
      `<div class="display-card">
        <h2>${data.answer}</h2>
        <button id="next-card">Next</button>
      </div>`;

    $('#display').html(resultElement);
}

function displayEnd(data){
  let resultElement = `<div class="end-card"></div>`;

   $('#display').html(resultElement);  
};

$("#start-button").on('click', function(){
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



