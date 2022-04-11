//Cards
class Card {
    constructor(suit, rank, value){
        this.suit = suit;
        this.rank = rank;
        this.value = value;
    }
}
//Deck
class Deck {
    constructor(){
        this.cards = [];
    }
    createDeck (){
        let suits = ['diamonds', 'hearts', 'spades', 'clubs'];
        let ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
        let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        /* Create the deck of cards by creating each individual cards;
        iterate through suits, ranks, and values to create all 13 cards for each suit
         */
        for (let i=0; i < suits.length; i++){
            for (let n=0; n< ranks.length; n++){
                this.cards.push(new Card(suits[i], ranks[n], values[n]));
            }
        } 
    }
    shuffleDeck(){
        for (let i = Deck.length - 1; i > 0; i--){
            let r = Math.floor(Math.random() * i);
            let rand = Deck[i];
            Deck[i] = Deck[r];
            Deck[r] = rand;
        }
        for (let i = 0; i < 5; i++) {
            console.log(`${Deck[i].values} of ${Deck[i].suits}`)
        }
    }
    createTableau(){
        t = new Array(7);
        for (var i=0; i < table.length; i++){
            table[i] = new Array(19);
        }
        return table;
    }
}
//game area
//draw pile
var d = [];

//waste pile
var w = [];

//aces
var diamonds = [];
var hearts = [];
var spades = [];
var clubs = [];

//tableau
var t = [];
t[1] = t[2] = t[3] = t[4] = t[5] = t[6] = t[7] = [];

var table = [];
table['draw'] = d;
table['waste'] = w;
table['diamonds'] = diamonds;
table['hearts'] = hearts;
table['spades'] = spades;
table['clubs'] = clubs;
table['tableau'] = t;

