/***
 * 2C = Two of Clubs - trebol
 * 2D = Two of Daiamonts - diamantes
 * 2H = Two of hearts - corazones
 * 2S = Two of spades - espadas
 */
let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['J', 'Q', 'K', 'A'];
playerPoints = 0;
computerPoints = 0;
//html references
const btnTake = document.querySelector('#take');
const btnStop = document.querySelector('#stop');
const btnNew = document.querySelector('#new');
const scores = document.querySelectorAll('small');
const playerCards = document.querySelector('#player-cards');
const computerCards = document.querySelector('#computer-cards');

//In this function, we create the deck.
const createDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let type of types) {
            deck.push(i + type)
        }
        //deck.push(i + 'C')
    }
    for (let type of types) {
        for (let special of specials) {
            deck.push(special + type)
        }
    }
    deck = _.shuffle(deck);
    //console.log(deck)
    return deck;
}

createDeck();

//In this function, take a card.
const takeCard = () => {
    if (deck.length === 0) {
        throw 'No cards in deck';
    }
    const card = deck[0];
    deck.shift();
    //console.log(card);
    //console.log(deck);
    return card;
}

//takeCard();

const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    //console.log({ value });
    return (isNaN(value)) ?
        (value === 'A') ? 11 : 10
        : value * 1;
}

const computerTurn = (minimunPoints) => {
    do {
        const card = takeCard();
        computerPoints = computerPoints + cardValue(card);
        console.log(computerPoints)
        scores[1].innerText = computerPoints;
        const imgCard = document.createElement('img');
        imgCard.src = `./assets/cartas/${card}.png`;
        imgCard.classList.add('card');
        computerCards.append(imgCard);
        if (minimunPoints > 21) {
            break;
        }
    } while ((computerPoints < minimunPoints) && (minimunPoints < 21));
    setTimeout(() => {
        if (computerPoints === minimunPoints) {
            alert('Nothing win :S');
        } else if (minimunPoints > 21) {
            alert('The computer IA Winnnn BIG LOL');
        } else if (computerPoints > 21) {
            alert('The player WIN, YEAAHH');
        } else {
            alert('The computer IA Winnnn BIG LOL');
        }
    }, 10)

}

//Events
//console.log(btnNew, btnTake, btnStop)

btnTake.addEventListener('click', () => {
    const card = takeCard();
    playerPoints = playerPoints + cardValue(card);
    console.log(playerPoints)
    scores[0].innerText = playerPoints;
    const imgCard = document.createElement('img');
    imgCard.src = `./assets/cartas/${card}.png`;
    imgCard.classList.add('card');
    playerCards.append(imgCard);
    if (playerPoints > 21) {
        console.warn('Sorry, but you LOST');
        btnTake.disabled = true;
        computerTurn(playerPoints);
    } else if (playerPoints === 21) {
        console.warn('Greatt =)')
    }
})

btnStop.addEventListener('click', () => {
    btnTake.disabled = true;
    btnStop.disabled = true;
    computerTurn(playerPoints);
})

btnNew.addEventListener('click', () => {
    deck = [];
    deck = createDeck();
    playerPoints = 0;
    computerPoints = 0;
    scores[0].innerText = 0;
    scores[1].innerText = 0;
    computerCards.innerHTML = '';
    playerCards.innerHTML = '';
    btnTake.disabled = false;
    btnStop.disabled = false;
    console.clear();
})