class Card {
    constructor(suit, rank, value) {
        this.suit = suit;
        this.rank = rank;
        this.value = value;
    }
}
class Deck {
    constructor() {
        this.cards = [];    
    }      
    createDeck() {
        let suits = ['clubs', 'diamonds', 'hearts', 'spades'];
        let ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9',     '10', 'jack', 'queen', 'king'];
        let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                this.cards.push(new Card(suits[i], ranks[j], values[j]));
            }
        }
    }
    shuffleDeck() {
       let location1, location2, tmp;
       for (let i = 0; i < 1000; i++) {
           location1 = Math.floor((Math.random() * this.cards.length));
           location2 = Math.floor((Math.random() * this.cards.length));
        tmp = this.cards[location1];
        this.cards[location1] = this.cards[location2];
        this.cards[location2] = tmp;
        }
    }
}







// //Cards
// const suits = ['']








// class Card {
//     constructor(suit, rank, value){
//         this.suit = suit;
//         this.rank = rank;
//         this.value = value;
//     }
// }
// //Deck
// class Deck {
//     constructor(){
//         this.cards = [];
//     }
//     createDeck (){
//         let suits = ['diamonds', 'hearts', 'spades', 'clubs'];
//         let ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
//         let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
//         let colors = {'diamonds': 'red', 'hearts':  'red', 'spades': 'black', 'clubs': 'black'}
//         /* Create the deck of cards by creating each individual cards;
//         iterate through suits, ranks, and values to create all 13 cards for each suit
//          */
//         for (let i=0; i < suits.length; i++){
//             for (let n=0; n< ranks.length; n++){
//                 this.cards.push(new Card(suits[i], ranks[n], values[n], colors[suits]));
//             }
//         } return Deck;
//     }
//     shuffleDeck() {
//         var i = Deck.length, temp, rand;
//         while (0 !== i) {
//            rand = Math.floor(Math.random() * i); i--;
//         temp = Deck[i];
//         Deck[i] = Deck[rand];
//         Deck[rand] = temp;
//         }
//         return Deck;
//     }
// }

// let $gameScreen = document.getElementById($gameScreen);
// let deck1 = [];
// let deck2 = [];

// let deck1El = document.getElementById('deck1') 
// let deck2El = document.getElementById('deck2')

// document.getElementById('btn').addEventListener('click', ()=> console.log('clicked'))
// // function renderGame(){
// // Initialize deck 1 with array of 52 cards 
// function init() { 
//     deck1 = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","h
//   A","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","c
//   J","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s0
//   9","s08","s07","s06","s05","s04","s03","s02"]
// }

// function handleClick() { 
 
//     // Used to prevent error on click when no cards are left in deck 1 
//     if (deck1.length > 0) {   
   
//       // Randomly select number from total cards remaining 
//       let randIdx = Math.floor(Math.random()*deck1.length) 
   
//       // Assigns card with the random index to a variable    
//       cardPicked = deck1.splice(randIdx, 1)  
   
//       // Adds card picked to deck 2 
//       deck2.push(cardPicked)  
   
//       // Pass card picked to render function to display 
//       render(cardPicked) 
//     } 
//   }

// // }
// // //game area
// // //draw pile
// // var d = [];

// // //waste pile
// // var w = [];

// // //aces
// // var diamonds = [];
// // var hearts = [];
// // var spades = [];
// // var clubs = [];

// // //tableau
// // var t = [];
// // t[1] = t[2] = t[3] = t[4] = t[5] = t[6] = t[7] = [];

// // var table = [];
// // table['draw'] = d;
// // table['waste'] = w;
// // table['diamonds'] = diamonds;
// // table['hearts'] = hearts;
// // table['spades'] = spades;
// // table['clubs'] = clubs;
// // table['tableau'] = t;

