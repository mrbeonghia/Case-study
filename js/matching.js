let allCards = document.querySelectorAll('.card');
let modal = document.querySelector('.modal-container');
let flippedCard = false;
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
    if ((firstCard.id === secondCard.id)&& (firstCard.style.order !== secondCard.style.order)){
        disableCards();
        count++;
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
    if(!flippedCard){
        flippedCard = true;
        firstCard = this;
        moves = parseInt(moves+2);
        return;
    }
    secondCard = this;
    flippedCard = false;

    checkForMatch();
}

function checkWin(){
    if(count === 6){
        modal.style.display = "flex";
    }
    document.getElementById('move').innerHTML = moves ;
}

function init(){
    shuffle(); //Random các lá bài
    modal.addEventListener('click', function (){location.reload()});//Click button "Play Again"
    allCards.forEach(card => card.addEventListener('click', flipCard)); //Click lật bài
}

init();
