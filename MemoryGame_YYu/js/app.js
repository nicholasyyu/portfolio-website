/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var cardNames = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor",
           "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf",
           "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
var openLog = [];
var openedCard = 2;
var step = 0;
var starsNum = 3;
var oneStar = 30;
var twoStar = 50;
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
// Checks if card is a valid move (if it not currently matched or open)
function isValid(card){
    if(card.hasClass("open") || card.hasClass("match")){
      return 0;
    }
    else {
      return 1;
    }
};

// Sets selected card to the open and shown state
function openCard(card){
    if (!card.hasClass("open")) {
        card.addClass("open");
        card.addClass("show");
        openLog.push(card);
    }
};

function checkCard(){
  var card0 = openLog[0].children().attr("class");
  var card1 = openLog[1].children().attr("class");
  if(card0 === card1){
    return 1;
  }
  else{
    return 0;
  }

}

var cardOpen = function keepCardOpen(card){
  openLog.forEach(function(card){
    card.addClass("match");
    openedCard++;
  });
  openLog = [];
}

var cardClose = function keepCardClose(card){
  openLog.forEach(function(card){
    card.toggleClass("open");
    card.toggleClass("show");
  });
  openLog = [];
}

function shuffleCards(){
  cardNames = shuffle(cardNames);
  var i = 0;
  $.each($(".card i"), function(){
    $(this).attr("class", "fa " + cardNames[i]);
    i++;
  });
}

var resetGame = function(){
  openLog = [];
  openedCard = 2;
  step = 0;
  $(".moves").text(step);
  resetStars();
  $(".card").attr("class", "card");
  shuffleCards();
}

function updateStars(){
  if(step === oneStar || step === twoStar){
    $(".fa-star").last().attr("class", "fa fa-star-o");
  }
}

function resetStars(){
  $(".fa-star-o").attr("class", "fa fa-star");
}


// detect click on cards.
$(".card").click(function(){

  step++;
  $(".moves").text(step);
  updateStars();

  if(isValid( $(this) )){

    if(openLog.length === 0){
      openCard( $(this) );
    }
    else if(openLog.length === 1){
      openCard( $(this) );

      if(checkCard() === 1){
        //keepCardOpen( $(this) );
        setTimeout(cardOpen, 300);
        //$('#myModal').show("block");
        if(openedCard === 16){
          modal.style.display = "block";
        }
      }
      else{
        //keepCardClose( $(this) );
        setTimeout(cardClose, 500);

      }
      //close the modal window;
      span.onclick = function() {
        modal.style.display = "none";
      }
      window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = "none";
          }
      }
    }

  }
});

$(".restart").click(resetGame);

$(shuffleCards);
