window.addEventListener('DOMContentLoaded', (e) => {
const suits = ["s", "d", "c", "h"];
const values = ["A", "02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K"];

let deck;
let draw;
let waste;
let aces;
let clickedCard;
let firstStackId;

const gameBoard = {draw: document.getElementById('draw'),
waste: document.getElementById('waste'),
ace1: document.getElementById('ace1'),
ace2: document.getElementById('ace2'),
ace3: document.getElementById('ace3'),
ace4: document.getElementById('ace4'),
stack1: document.getElementById('stack1'),
stack2: document.getElementById('stack2'),
stack3: document.getElementById('stack3'),
stack4: document.getElementById('stack4'),
stack5: document.getElementById('stack5'),
stack6: document.getElementById('stack6'),
stack7: document.getElementById('stack7')}



document.querySelector('body').addEventListener('click', handleClick);


init();
function init(){
    deck = [];
    cardArr=[];
    draw = [];
    waste = [];
    aces = [[], [], [], []];
    stacks = [[],[],[],[],[],[],[]];
    stackUp=[1,1,1,1,1,1,1];
    newDeck();
    shuffleDeck();
    dealGame();
    render();
}
function render(){
    resetGame();
    drawPile();
    wastePile();
    acePile();
    tableauStack();
}
function tableauStack(){
    let numCards;
    let cardBack;
    stacks.forEach((stack, ind) => {
        numCards = 0;
        cardBack = 0;
        stack.forEach((card, indCard) =>{
            let cardEle = document.createElement('div');
            cardEle.className = `card back ${card.suit}${card.value}`
            let faceUp = stackUp[ind];
            while(faceUp > 0){
                if(indCard === stack.length - faceUp){
                    cardEle.className = cardEle.className.replace(' back','');
                }
                faceUp--;
            }
            if (cardEle.className.includes('back')){
                cardEle.style = `position: absolute; left: -7px; top: ${-7 + (indCard * 12)}px;`;
                cardBack++;
            } else {
                if (numCards === 0) {
                    cardEle.style = `position: absolute; left: -7px; top: ${-7 + (indCard * 12)}px;`
                    numCards++
                } else {
                    cardEle.style = `position: absolute; left: -7px; top: ${-7 + (indCard * 12)+(9 * (indCard-cardBack))}px;`
                }
            }
            gameBoard[`stack${ind +1}`].appendChild(cardEle);
        })
    })
}
function drawPile(){
    draw.forEach((card, indCard) => {
        let cardEle = document.createElement('div');
        cardEle.className = `card back ${card.suit}${card.value}`
        cardEle.style = `position: absolute; left: -7px; top: ${-7 + (indCard*-.5)}px;`
        gameBoard.draw.appendChild(cardEle);
    });
}
function wastePile(){
    waste.forEach((card, indCard) => {
        let cardEle = document.createElement('div');
        cardEle.className = `card ${card.suit}${card.value}`
        cardEle.style = `position: absolute; left: -7px; top: ${-7 + (indCard*-.5)}px;`
        gameBoard.waste.appendChild(cardEle);
    });
}
function acePile(){
    aces.forEach((stack, ind)=>{
        stack.forEach((card, indCard)=>{
            let cardEle = document.createElement('div');
            cardEle.className = `card ${card.suit}${card.value}`
            cardEle.style = `position: absolute; left: -7px; top: ${-7 + (indCard*-.5)}px;`
            gameBoard[`ace${ind +1}`].appendChild(cardEle);
        });
    });
}
function gameWon(){
    for (let i = 0; i <aces.length; i++){
        if(aces[i].length<13){
            return false;
        }
    } return true;
}
function newDeck(){
    suits.forEach(suit =>{
        values.forEach(value=>{
            let card = {value: value, suit: suit};
            deck.push(card);
        });
    });
}
function shuffleDeck() {
    var i = deck.length, temp, rand;
    while (0 !== i) {
        rand = Math.floor(Math.random() * i);
        i--;
        temp = deck[i];
        deck[i] = deck[rand];
        deck[rand] = temp;
    }
    return deck;
}
function dealGame(){
    stacks.forEach((stack, ind)=>{
        for (let i=0; i<ind +1; i++)
        stack.unshift(deck.shift());
    });
    deck.forEach(card =>{
        draw.push(card);
    });
}
function resetGame(){
    for(let gameEl in gameBoard){
        while(gameBoard[gameEl].firstChild){
            gameBoard[gameEl].removeChild(gameBoard[gameEl].firstChild);
        }
    }
}
function handleClick(evt) {

    let clickDest = getClickDestination(evt.target);
    


    if (clickDest.includes('stack')) {
        handleStackClick(evt.target);
    } else if (clickDest.includes('ace')) {
        handleAceClick(evt.target);
    } else if (clickDest === 'waste') {
        handleWasteClick(evt.target);
    } else if (clickDest === 'draw') {
        handleDrawClick();
    } else if (clickDest === 'resetButton') {
        init();
    }
}

function handleStackDoubleClick(element) {
    let stackId = getClickDestination(element).replace('stack', '') -1;
    let clickDest = getClickDestination(element);
    let firstCard;

    if(stackId) {
        firstCard = stacks[stackId][stacks[stackId].length -1];
    } else { 
        firstCard = waste[waste.length -1];
    }

    if (document.querySelector('.highlight')) {
        let highlightEl = document.querySelector('.highlight')
        if (isTheSameCard(highlightEl, clickedCard) && clickDest === getClickDestination(highlightEl)) {
            checkForLegalMove(clickDest);
        }
    } else {
        if (firstCard && isFaceUpCard(element)) {
            checkForLegalMove(clickDest)
        }
    }
}

function isTheSameCard(cardEl, cardObj) {
    let card1 = getCardClassFromEl(cardEl);
    let card2 = getCardClassFromObj(cardObj);
    
    return card1 === card2;
}

function getCardClassFromEl(cardEl) {
    let cardClass = cardEl.className.replace('card ', '');
    cardClass = cardClass.replace(' highlight', '');
    return cardClass;
}

function getCardClassFromObj(cardObj) {
    let cardClass = `${cardObj.suit}${cardObj.value}`
    return cardClass;
}

function checkForLegalMove(clickDest) {
    
    let stackIdx = clickDest.replace('stack', '') -1;
    let card = getCardClassFromEl(document.getElementById(clickDest).lastChild);
    let cardObj = getCardObjFromClass(card);
    let acePileTopCardsArr = getAcePileTopCards();
    
    // move a card to the proper place if it's a legal play
    acePileTopCardsArr.forEach((topCardObj, aceIdx) => {
        if (topCardObj.suit === cardObj.suit) {
            if(getCardValue(topCardObj) === getCardValue(cardObj) -1) {
                if(!clickedCard) {
                    moveTopCard(stacks[stackIdx], aces[aceIdx]);
                    stackUp[stackIdx]--;
                    clickedCard = null;
                    while(cardArr.length > 0) {
                        cardArr.pop();
                    }
                    render();
    
                } else if(clickedCard) {
                    aces[aceIdx].push(clickedCard);
                    clickedCard = null;
                    while(cardArr.length > 0) {
                        cardArr.pop();
                    }
                    render();
                }
            }
        } 
    });

    // move an ace to the first available empty ace pile
    for (let aceIdx = 0; aceIdx < acePileTopCardsArr.length; aceIdx++) {
        if(acePileTopCardsArr[aceIdx] === 0 && getCardValue(cardObj) === 1) {
            
            if(!clickedCard) {
                moveTopCard(stacks[stackIdx], aces[aceIdx]);
                stackUp[stackIdx]--;
                clickedCard = null;
                while(cardArr.length > 0) {
                    cardArr.pop();
                }
                render();

            } else if(clickedCard) {
                aces[aceIdx].push(clickedCard);
                clickedCard = null;
                while(cardArr.length > 0) {
                    cardArr.pop();
                }
                render();
            }
            break;
        }
    }
}

function moveTopCard(fromStack, toStack) {
    toStack.push(fromStack.pop())
}


function getAcePileTopCards() {
    let acePileTopCards = []
    for(let i = 0; i < aces.length; i++) {
        if(aces[i].length > 0) {
            acePileTopCards.push((aces[i][aces[i].length-1]));
        } else {
            acePileTopCards.push(0)
        }
    }
    return acePileTopCards;
}

function getCardObjFromClass(cardClass) {
    let cardObj = {};
    cardObj.suit = cardClass[0];
    let value = cardClass[1] + (cardClass[2] ? cardClass[2] : '');
    cardObj.value = value;
    return cardObj;
}

function handleStackClick(element) {
    let stackId = getClickDestination(element).replace('stack', '') -1;
    let clickDest = getClickDestination(element);
    let topCard = stacks[stackId][stacks[stackId].length -1];
    let stackPos;

    // select and highlight card to move
    if (!clickedCard && isFaceUpCard(element)) {
        firstStackId = stackId;
        firstClickDest = clickDest;
        element.className += ' highlight';
        stackPos = getPositionInStack(element.parentNode.children);
        clickedCard = stacks[stackId][stackPos];
        let cardsToPush = stackPos - stacks[stackId].length;
        while(cardsToPush < 0){
            cardArr.push(stacks[stackId].pop());
            stackUp[stackId]--;
            cardsToPush++;
        }

    // flip over unflipped card in stack
    } else if (!clickedCard && element === element.parentNode.lastChild) {
        stackUp[stackId]++;
        render();

    // move card to stack destination
    } else if (clickedCard && isFaceUpCard(element)) {

        // allow clicks on first clicked card
        if (stackId === firstStackId && clickDest === firstClickDest) {
            while(cardArr.length > 0) {
                stacks[stackId].push(cardArr.pop());
                stackUp[stackId]++
            }
            clickedCard = null;
            render();

        // push card to stack if play is legal
        } else if(isPlayLegal(clickedCard, topCard)){
            while(cardArr.length > 0) {
                stacks[stackId].push(cardArr.pop());
                stackUp[stackId]++;
            }clickedCard = null;
            render();
        }

    // move card to empty stack destination
    } else if (clickedCard && isEmptyStack(element) && getCardValue(clickedCard) === 13) {
        while(cardArr.length > 0) {
            stacks[stackId].push(cardArr.pop());
            stackUp[stackId]++;
        }clickedCard = null;
        render();
    } 
} 

function handleAceClick(element) {
    let aceId = getClickDestination(element).replace('ace', '') -1;
    let clickDest = getClickDestination(element);
    let topCard = aces[aceId][aces[aceId].length -1];

    // if a face up card hasn't been clicked yet, select and highlight this one
    if(!clickedCard && isFaceUpCard(element)){
        firstStackId = aceId;
        firstClickDest = clickDest;
        element.className += ' highlight';
        stackPos = getPositionInStack(element.parentNode.children);
        clickedCard = aces[aceId][stackPos];
        let cardsToPush = stackPos - aces[aceId].length;
        while(cardsToPush < 0){
            cardArr.push(aces[aceId].pop());
            cardsToPush++;
        }

    // if the highlighted card is an ace, put it in the empty ace pile
    } else if (clickedCard) {
        if(!topCard) {
            if(getCardValue(clickedCard) === 1) {
                while(cardArr.length > 0) {
                    aces[aceId].push(cardArr.pop());
                }
                clickedCard = null;
                render();
            }

        // if the highlighted card is 1 higher and of the same suit, play it on the ace
        } else {
            if (getCardValue(clickedCard) === getCardValue(topCard) + 1 && clickedCard.suit === topCard.suit) {
                while(cardArr.length > 0) {
                    aces[aceId].push(cardArr.pop());
                }
                clickedCard = null;
                render();
            }
        }    
    }
}

function handleWasteClick(element) {

    let topCard = waste[waste.length -1];
    let topCardEl = gameBoard.waste.lastChild;

    // if there is no highlighted card, and the draw pile isn't an empty stack, select the top card
    if(!clickedCard && !isEmptyStack(element)){
        topCardEl.className += ' highlight';
        clickedCard = topCard;
        firstStackId = 'waste';
        firstClickDest = 'waste';
        let cardsToPush = -1;
        while(cardsToPush < 0){
            cardArr.push(waste.pop());
            cardsToPush++;
        }

    // if the highlighted card is from the draw pile, put it back in the pile (deselect it)
    } else if (!isEmptyStack(element) && topCardEl.className.includes('highlight') && getClickDestination(element) === 'waste') {
        while(cardArr.length > 0) {
            waste.push(cardArr.pop());
        }
        clickedCard = null;
        render();
    } 
}

function handleDrawClick () {
    if(!clickedCard) {
        // if there are cards in the 'pile', flip one into the 'draw'
        if(draw.length > 0) {
            waste.push(draw.pop());
            render();
        // if the pile is empty, recycle the 'draw' into the 'pile' and subtract points    
        } else {
            while(waste.length > 0) {
                draw.push(waste.pop())
            }
        render();
        }
    }
}

function isEmptyStack(element) {
    return !!element.id;
}

function isPlayLegal(card1, card2) {
    
    let card1Color = getCardColor(card1);
    let card1Value = getCardValue(card1);
    let card2Color = getCardColor(card2);
    let card2Value = getCardValue(card2);

    if(card1Color === card2Color) {
        return false;
    } else if (card2Value - card1Value === 1) {
        return true;
    } else return false;
}

function getCardColor(cardObj) {
    if (cardObj.suit === 'h' || cardObj.suit === 'd') {
        return 'red'
    } else return 'black';
}

function getCardValue(cardObj) {
    switch(cardObj.value) {
        case 'A': return 1;
        break;
        case '02': return 2;
        break;
        case '03': return 3;
        break;
        case '04': return 4;
        break;
        case '05': return 5;
        break;
        case '06': return 6;
        break;
        case '07': return 7;
        break;
        case '08': return 8;
        break;
        case '09': return 9;
        break;
        case '10': return 10;
        break;
        case 'J': return 11;
        break;
        case 'Q': return 12;
        break;
        case 'K': return 13;
        break;
    }
}

function getPositionInStack(stackPos) {
    for(let i = 0; i < stackPos.length; i++) {
        if(stackPos[i].className.includes('highlight')) {
            return i;
        }
    }
}


function isFaceUpCard(element) {
    return (element.className.includes('card') && !(element.className.includes('back')) && !(element.className.includes('outline'))) 
}

// function isAcePile(element) {
//     if (!(element.firstChild)) {
//         return element.id.includes('ace');
//     } else {
//         return element.parentNode.id.includes('ace');
//     }
// }

function getClickDestination(element) {
    if (element.id) {
        return element.id;
    } 
    else {
        return element.parentNode.id;
    }
}

function youWon() {
    aces.forEach(arr => {
        
        for(let i = 0; i < 13; i++) {
            arr.push(`fake card ${i +1 }`);
        }
    })
    render();
}
})

// ------------

// // Ace: 0, king: 12 
// // 0-12: hearts, 13-25:diamonds, 26-38:spades, 39-52:clubs
// // Checks the legality of any move on the main board
// function checkBoardMove(firstPile, secondPile) {
//     if (secondPile.length === 0) {
//         legal(firstPile, secondPile);
//     }
//     else if (firstPile[firstPile.length-1] === 12 || firstPile[firstPile.length-1] === 25 || firstPile[firstPile.length-1] === 38 || firstPile[firstPile.length-1] === 51 ) {
//         illegal();
//     }
//         else if (firstPile[firstPile.length-1] < 13) {
//             if (secondPile[0] === firstPile[firstPile.length-1] + 27 || secondPile[0] === firstPile[firstPile.length-1] + 40) {
//                 legal(firstPile, secondPile);
//             }
//             else illegal()}
//         else if (firstPile[firstPile.length-1] < 26) {
//             if (secondPile[0] === firstPile[firstPile.length-1] + 14 || secondPile[0] === firstPile[firstPile.length-1] + 27) {
//                 legal(firstPile, secondPile);
//             }
//             else illegal()}
//         else if (firstPile[firstPile.length-1] < 39) {
//             if (secondPile[0] === firstPile[firstPile.length-1] - 12 || secondPile[0] === firstPile[firstPile.length-1] - 25) {
//                 legal(firstPile, secondPile);
//             }
//             else illegal()}
//         else if (firstPile[firstPile.length-1] < 52) {
//             if (secondPile[0] === firstPile[firstPile.length-1] - 25 || secondPile[0] === firstPile[firstPile.length-1] - 38) {
//                 legal(firstPile, secondPile);
//             }
//             else illegal()}  
//     }

// // checks legality of moves onto the final piles
// function checkFinalMove(firstPile, secondPile) {
//     if (firstPile.length === 1) {
//         if (firstPile[0] === staticCards[0] || firstPile[0] === staticCards[13] || firstPile[0] === staticCards[26] || firstPile[0] === staticCards[39]) {
//             if (secondPile.length === 0) {
//             legal(firstPile, secondPile);
//             }
//             else illegal();
//             }
//         else if (firstPile[0] === secondPile[0] + 1) {
//             legal(firstPile, secondPile)
//         }
//         else illegal();
//     }
//     else illegal();
// }

// // processes legal moves
// function legal(firstPile, secondPile) {
//     for (var i = firstPile.length-1; i >= 0; i--) {
//         secondPile.unshift(firstPile[i])
//     };
//     secondPile.unshift('placeholder');
//     switch (firstPile[0]) {
//         case deckPile[0]: 
//             for (var i = firstPile.length; i > 0; i--) 
//                 {deckPile.shift()}
//         break;
//         case boardPile1[0]: 
//             for (var i = firstPile.length; i > 0; i--) 
//                 {boardPile1.shift()}
//         break;
//         case boardPile2[0]: 
//             for (var i = firstPile.length; i > 0; i--)
//                 {boardPile2.shift()}
//         break;
//         case boardPile3[0]: 
//             for (var i = firstPile.length; i > 0; i--)
//                 {boardPile3.shift()}
//         break;
//         case boardPile4[0]: 
//             for (var i = firstPile.length; i > 0; i--) {
//                 boardPile4.shift()}
//         break;
//         case boardPile5[0]: 
//             for (var i = firstPile.length; i > 0; i--) {
//                 boardPile5.shift()}
//         break;
//         case boardPile6[0]: 
//             for (var i = firstPile.length; i > 0; i--)
//                 {boardPile6.shift()}
//         break;
//         case boardPile7[0]: 
//             for (var i = firstPile.length; i > 0; i--)
//                 {boardPile7.shift()}
//         break;
//         case finalPile1[0]: 
//             for (var i = firstPile.length; i > 0; i--) {
//                 finalPile1.shift()}
//         break;
//         case finalPile2[0]: 
//             for (var i = firstPile.length; i > 0; i--) {
//                 finalPile2.shift()}
//         break;
//         case finalPile3[0]: 
//             for (var i = firstPile.length; i > 0; i--)
//                 {finalPile3.shift()}
//         break;
//         case finalPile4[0]: 
//             for (var i = firstPile.length; i > 0; i--)
//                 {finalPile4.shift()}
//         break;
//     }
//     resetFirstPile();
//     secondPile.shift();
//     moves++;
//     render();
// }

// // returns the board to normal state after an illegal move
// function illegal() {
//     resetFirstPile();
//     render();
//     }

// // flips the deckPile into the deck when the deck is empty
// function reloadDeck() {
//     if (deck.length === 0) {
//         for (var i = deckPile.length; i > 0; i--) {
//             deck.unshift(deckPile.shift());
//         }};
// }

// // win condition
// function checkWin() {
//     if (finalPile1[0] === staticCards[12] || finalPile1[0] === staticCards[25] || finalPile1[0] === staticCards[38] || finalPile1[0] === staticCards[51]) {
//         if (finalPile2[0] === staticCards[12] || finalPile2[0] === staticCards[25] || finalPile2[0] === staticCards[38] || finalPile2[0] === staticCards[51]) {
//             if (finalPile3[0] === staticCards[12] || finalPile3[0] === staticCards[25] || finalPile3[0] === staticCards[38] || finalPile3[0] === staticCards[51]) {
//                 if (finalPile4[0] === staticCards[12] || finalPile4[0] === staticCards[25] || finalPile4[0] === staticCards[38] || finalPile4[0] === staticCards[51]) {
//                     $('.winMessage').text('You win!');
                    
//                 }
//             }
//         }
//     }
//     else return;
// }
// // Flips over the first card in each board array
// function flipFirstCard() {
//     if (boardPile1.length > 0); {
//         $(boardState1[boardPile1.length-1]).addClass('faceUp').removeClass('back-blue')}
//     if (boardPile2.length > 0); {
//         $(boardState2[boardPile2.length-1]).addClass('faceUp').removeClass('back-blue')}
//     if (boardPile3.length > 0); {
//         $(boardState3[boardPile3.length-1]).addClass('faceUp').removeClass('back-blue')}
//     if (boardPile4.length > 0); {
//         $(boardState4[boardPile4.length-1]).addClass('faceUp').removeClass('back-blue')}
//     if (boardPile5.length > 0); {
//         $(boardState5[boardPile5.length-1]).addClass('faceUp').removeClass('back-blue')}
//     if (boardPile6.length > 0); {
//         $(boardState6[boardPile6.length-1]).addClass('faceUp').removeClass('back-blue')}
//     if (boardPile7.length > 0); {
//         $(boardState7[boardPile7.length-1]).addClass('faceUp').removeClass('back-blue')}};

// // Flips over all cards stacked on top of flipped cards--catch-all for 'faceUp class'
// function flipAllOtherCards() {
//     flipOtherCards(boardState1);
//     flipOtherCards(boardState2);    
//     flipOtherCards(boardState3);    
//     flipOtherCards(boardState4);    
//     flipOtherCards(boardState5);    
//     flipOtherCards(boardState6);    
//     flipOtherCards(boardState7);  
// }

// function flipOtherCards(arr) {
//     for (var i = 0; i < arr.length; i++) {
//         if ($(arr[i]).hasClass('faceUp')) {
//             $(arr[i+1]).addClass('faceUp')
//         }
//     }

//     function render() {
//         checkWin();
//         renderPiles();
//         renderFaceDowns();    
//         flipFirstCard();
//         flipAllOtherCards();      
//         renderTop();
//         addFaceUpClick();
//         addEmptyClick();    
//         updateScore();
//         updateMoves();
//         makeFaceUpSolid();
//     }
    
//     function addFaceUpClick() {
//         $('.faceUp').off();
//     var $faceUps = $('td');
//     for (var i = 7; i < $faceUps.length; i++) {
//         if (i % 7 === 0) {
//             selectBoardPile($faceUps, i, boardPile1, boardPile1.length - (i/7));
//         }
//         else if (i % 7 === 1 ) {
//             selectBoardPile($faceUps, i, boardPile2, boardPile2.length - ((i-1)/7));
//         }
//         else if (i % 7 === 2 ) {
//             selectBoardPile($faceUps, i, boardPile3, boardPile3.length - ((i-2)/7));
//         }
//         else if (i % 7 === 3 ) {
//             selectBoardPile($faceUps, i, boardPile4, boardPile4.length - ((i-3)/7));
//         }
//         else if (i % 7 === 4 ) {
//             selectBoardPile($faceUps, i, boardPile5, boardPile5.length - ((i-4)/7));
//         }
//         else if (i % 7 === 5 ) {
//             selectBoardPile($faceUps, i, boardPile6, boardPile6.length - ((i-5)/7));
//         }
//         else if (i % 7 === 6 ) {
//             selectBoardPile($faceUps, i, boardPile7, boardPile7.length - ((i-6)/7));
//         }
//     }
//     };
    
//     function selectBoardPile($faceUps, i, pile, num) {
//         $($faceUps[i]).on('click', function(evt) {
//             if (firstPile.length === 0) {
//                 if ($(this).hasClass('empty')) {
//                     addEmptyToFirstPile(pile[0])
//                 }
//                 else {
//                     addToFirstPile(pile, num);
//                     $(this).css('opacity', '.8')
//                 }}
//             else checkBoardMove(firstPile, pile)
//     })}
    
//     function addToFirstPile(pile, num) {
//         for (var i = num; i >= 0; i--) {
//             firstPile.unshift(pile[i])
//         }
//     }
//     function addEmptyToFirstPile(card) {
//         firstPile.unshift(card);
//     }
    
//     init();
//     })