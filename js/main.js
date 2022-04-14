const suits = ["s", "d", "c", "h"];
const values = ["A", "02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K"];

let deck;
let card;
let draw;
let waste;
let aces;
let tableau;

const gameBoard = {draw: document.getElementById('draw'),
waste: document.getElementById('waste'),
ace1: document.getElementById('hearts'),
ace2: document.getElementById('diamonds'),
ace3: document.getElementById('spades'),
ace4: document.getElementById('clubs'),
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
    card = [];
    draw = [];
    waste = [];
    aces = [[], [], [], []];
    stacks = [[],[],[],[],[],[],[]];
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
    gameWon();
}
function tableauStack(){
    let numCards;
    let cardBack;
    stacks.forEach((tableau, ind) => {
        numCards = 0;
        cardBack = 0;
        tableau.forEach((card, indCard) =>{
            let cardEle = document.createElement('div');
            cardEle.className = `card back ${card.suit}${card.value}`
            let stackUp=[1,1,1,1,1,1,1];
            let faceUp = stackUp[ind];
            while(faceUp > 0){
                if(indCard === tableau.length - faceUp){
                    cardEle.className = cardEle.className.replace('  back','');
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
    });
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
    } else if (clickDest === 'draw') {
        isDoubleClick() ? handleStackDoubleClick(evt.target) :handleDrawClick(evt.target);
    } else if (clickDest === 'pile') {
        handlePileClick();
    } else if (clickDest === 'resetButton') {
        init();
    }
}