var cards_js = [
        {
            "id":"1",
            "question": "const",
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
    if (used.indexOf(index) != -1) {
      console.log("conflict");
    } else {
      used.push(index);
      notUsed = false;
    }
  }
  if (used.length === cards_js.length) {
    return "All cards used"
  } else {
    return cards_js[index];
  }
};

var currentCard = getCard(cards_js);

function displayCardQuestion(data){
	resultElement += `<div class="display-card">`;
	resultElement += `<h2>${data.question}</h2>`;
    resultElement += `<button id="answer-button">Flip It</button>`
	resultElement += `</div>`;

	$('#display-card').append(resultElement);
};

function displayCardAnswer(data){
    resultElement += `<div class ="display-card">`;
    resultElement += `<h2>${data.answer}</h2>`;
    resultElement += `<button id="next-card">Next</button>`;
    resultElement += `</div>`;

    $('#display-card').append(resultElement);
}

/*function displayStart(start){
	$("#display-card").remove();
};*/

$("#start-button").on('click', function(){
    $("#display-card").removeClass("hidden");
    displayCardQuestion(currentCard);
});

$("#answer-button").on('click', function(){
    displayCardAnswer(currentCard);
});

$("#next-card").on('click', function(){
    getCard(cards_js);
    displayCardQuestion(currentCard);
});



