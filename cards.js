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

let used = [];

const getCard = () => {
  let notUsed = true;
  while (notUsed && used.length < cards_js.length) {
    var index = Math.floor(Math.random() * arr.length);
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
}

var currentCard = getCard(cards_js);

function displayCardQuestion(data){
	resultElement += `<div class="card">`;
	resultElement += `<h2>${data.question}</h2>`;
	resultElement += `</div>`

	$('#display-card').append(resultElement);
};

function displayStart(start){
	$("#display-card").removeClass("hidden");
};

$("#start-button").on('click', function(){
   displayStart();
   displayCardQuestion(currentCard);
};



