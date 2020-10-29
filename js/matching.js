let allCards = document.querySelectorAll('.card');
let modal = document.querySelector('.modal-container');
let hasFlippedCard = false;
let firstCard, secondCard;
let count = 0;
let moves = 0;

function shuffle(){
    allCards.forEach(card => {
        let random = Math.floor(Math.random() * 12);
        card.style.order = random;
    });
}

function checkForMatch() {
    if (firstCard.id === secondCard.id){
        disableCards();
        count++;
        // console.log(count);
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

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
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
        moves = parseInt(moves+2);
        return;
    }
    secondCard = this;
    hasFlippedCard = false;
    console.log(moves);

    checkForMatch();
}

function checkWin(){
    if(count === 6){
        modal.style.display = "flex";
    }
    document.getElementById('move').innerHTML = moves ;
}

function init(){
    shuffle(); //Randomize the order of cards
    modal.addEventListener('click', () => {location.reload()});//Click Listener for "Play Again" button
    allCards.forEach(card => card.addEventListener('click', flipCard));
}

init();
