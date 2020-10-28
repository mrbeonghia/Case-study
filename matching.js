// GLOBAL VARIABLES
const allCards = document.querySelectorAll('.card');
var modal = document.querySelector('.modal-container');
let hasFlippedCard = false;
let firstCard, secondCard;
var matchScore = 0;


function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

function shuffle(){
  allCards.forEach(card => {
    let random = Math.floor(Math.random() * 12);
    card.style.order = random;
  });
}

function checkForMatch() {
  if (firstCard.id === secondCard.id)  {
    console.log('Cards Distro match!');
    disableCards();
    matchScore++;
    console.log('SCORE => '+matchScore);
    checkWin();
    return;
  }
  unflipCards();
}

function disableCards(){
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  firstCard.classList.add('disabled');
  secondCard.classList.add('disabled');
}

async function unflipCards(){
  await sleep(500);
  firstCard.classList.remove('flip');
  secondCard.classList.remove('flip');
}


function flipCard(){
  this.classList.toggle('flip');

  if(!hasFlippedCard){
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  hasFlippedCard = false;
  checkForMatch();
}

function checkWin(){
  if(matchScore >= 6){
    modal.style.display = "flex";
  }
}

function main(){
  shuffle(); //Randomize the order of cards
  modal.addEventListener('click', () => {location.reload()});//Click Listener for "Play Again" button
  allCards.forEach(card => card.addEventListener('click', flipCard));
}


//Call Main Function
main();