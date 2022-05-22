const miModulo = (() => {
    'use strict';
    let deck = [];
    const types = ['C', 'D', 'H', 'S'],
        specials = ['J', 'Q', 'K', 'A'];
    let playerPoints = [];
    //html references
    const btnTake = document.querySelector('#take');
    const btnStop = document.querySelector('#stop'),
        btnNew = document.querySelector('#new'),
        scores = document.querySelectorAll('small');
    const divCardsPlayer = document.querySelectorAll('.cardsDiv')
    const startGame = (numPlayers = 2) => {
        deck = createDeck();
        playerPoints = [];
        for (let i = 0; i < numPlayers; i++) {
            playerPoints.push(0)
        }
        scores.forEach(elem => elem.innerText = 0)
        divCardsPlayer.forEach(elem => elem.innerHTML = '');
        btnTake.disabled = false;
        btnStop.disabled = false;
        console.clear();
    }

    //In this function, we create the deck.
    const createDeck = () => {
        deck = [];
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
        return _.shuffle(deck);
    }

    //In this function, take a card.
    const takeCard = () => {
        if (deck.length === 0) {
            throw 'No cards in deck';
        }
        const card = deck[0];
        return deck.shift();
    }

    const cardValue = (card) => {
        const value = card.substring(0, card.length - 1);
        return (isNaN(value)) ?
            (value === 'A') ? 11 : 10
            : value * 1;
    }

    //Turn 0 = player
    //Last turn = computer
    const pointsAcum = (card, turn) => {
        playerPoints[turn] = playerPoints[turn] + cardValue(card);
        scores[turn].innerText = playerPoints[turn];
        return playerPoints[turn];
    }

    const cardCreate = (card, turn) => {
        const imgCard = document.createElement('img');
        imgCard.src = `./assets/cartas/${card}.png`;
        imgCard.classList.add('card');
        divCardsPlayer[turn].append(imgCard);
    }

    const winnerDecider = () => {
        const [minimunPoints, computerPoints] = playerPoints;
        setTimeout(() => {
            if (computerPoints === minimunPoints) {
                alert('Nothing win :S');
            } else if (minimunPoints > 21) {
                alert('The computer IA Winnnn BIG LOL');
            } else if (computerPoints > 21) {
                alert('The player WIN, YEAAHH');
            } else {
                alert('The player ONE WIN BIG LOL');
            }
        }, 10);
    }

    const computerTurn = (minimunPoints) => {
        let computerPoints = 0;
        do {
            const card = takeCard();
            computerPoints = pointsAcum(card, playerPoints.length - 1);
            cardCreate(card, playerPoints.length - 1);
        } while ((computerPoints < minimunPoints) && (minimunPoints < 21));
        winnerDecider();
    }

    btnTake.addEventListener('click', () => {
        const card = takeCard();
        const playerOnePoints = pointsAcum(card, 0)
        cardCreate(card, 0)

        if (playerOnePoints > 21) {
            console.warn('Sorry, but you LOST');
            btnTake.disabled = true;
            computerTurn(playerOnePoints);
        } else if (playerOnePoints === 21) {
            console.warn('Greatt =)')
            computerTurn(playerOnePoints);
        }
    });

    btnStop.addEventListener('click', () => {
        btnTake.disabled = true;
        btnStop.disabled = true;
        computerTurn(playerPoints[0]);
    });

    btnNew.addEventListener('click', () => {
        startGame();
    });

    return {
        newGame: startGame
    };

})();
