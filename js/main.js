// let deck1 = [] 
// let deck2 = [] 
const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = ["A", "02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K"];
const rank = ["A", "r02", "r03", "r04", "r05", "r06", "r07", "r08", "r09", "r10", "J", "Q", "K"];

// // Cached element references 
let deck1El = document.getElementById('deck1') 
let deck2El = document.getElementById('deck2')




init(); 

// Initialize deck 1 with array of 52 cards 
function init() {
    deck1 = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
} console.log(deck1);

function render() {
    deck.forEach(function(card, ind) {
        deck1[ind].style.backgroundImage= `url("images/${suits}/${suits}-${rank}.svg")`
    });
}

 // build stock pile
 var s = [];

 // build waste pile
 var w = [];

 // build foundations
 var spades = [];
 var hearts = [];
 var diamonds = [];
 var clubs = [];

 // build tableau
 var t = [];
 t[1] = t[2] = t[3] = t[4] = t[5] = t[6] = t[7] = [];

 // build table
 var game = [];
 game['stock'] = s;
 game['waste'] = w;
 game['spades'] = spades;
 game['hearts'] = hearts;
 game['diamonds'] = diamonds;
 game['clubs'] = clubs;
 game['stack'] = t;

 // initial face up cards
 var playedCards =
 '#waste .card,' +
 '#aces .card,' +
 '#stack .card:last-child';

//  // cache selectors
//  var $timer = d.querySelector('#score .timer');
//  var $timerSpan = d.querySelector('#score .timer span');
//  var $moveCount = d.querySelector('#score .move-count');
//  var $moveCountSpan = d.querySelector('#score .move-count span');
//  var $score = d.querySelector('#score .score');
//  var $scoreSpan = d.querySelector('#score .score span');
//  var $playPause = d.querySelector('#play-pause');
//  var $table = d.querySelector('#table');
//  var $upper = d.querySelector('#table .upper-row');
//  var $lower = d.querySelector('#table .lower-row');
//  var $stock = d.querySelector('#stock');
//  var $waste = d.querySelector('#waste');
//  var $fnd = d.querySelector('#fnd');
//  var $tab = d.querySelector('#tab');
//  var $autoWin = d.querySelector('#auto-win');

//  // other global vars
//  var clock = 0;
//  var time = 0;
//  var moves = 0;
//  var score = 0;
//  var bonus = 0;
//  var lastEventTime = 0;
//  var unplayedTabCards = [];


 game = deal(deck, game);

// // 4. RENDER TABLE
   render(game, playedCards);

// // 5. START GAMEPLAY
play(game);

// // ### EVENT HANDLERS ###
   window.onresize = function(event) {
      sizeCards();
   };
   function deal(deck, game) {
    console.log('Dealing Deck...');
    // move all cards to stock
    game['stock'] = deck;
    // build tableau
       var tabs = game['tableau'];
       // loop through 7 tableau rows
       for (var row = 1; row <= 7; row++) {
          // loop through 7 piles in row
          for (var pile = row; pile <= 7; pile++) {
             // build blank pile on first row
             if (row === 1) tabs[pile] = [];
             // deal card to pile
             move(game['stock'], tabs[pile], false);
          }
       }
    return game;
 }

// // move card
//  function move(source, dest, pop, selectedCards = 1) {
//     if (pop !== true) {
//        var card = source.shift(); // take card from bottom
//        dest.push(card); // push card to destination pile
//     } else {
//        while (selectedCards) {
//           // take card from the top of selection
//           var card = source[source.length - selectedCards];
//           // remove it from the selected pile
//           source.splice(source.length - selectedCards, 1);
//           // put it in the destination pile
//           dest.push(card);
//           // decrement
//           selectedCards--; 
//        }
//     }
//     return;
//  }

// render table
 function render(game, playedCards) {
    console.log('Rendering Table...');

    // check for played cards
    playedCards = checkForPlayedCards(playedCards);

    // check for empty piles
    emptyPiles = checkForEmptyPiles(game);

    // update stock pile
    update(gmae['stock'], '#draw ul', playedCards, true);
    // update waste pile
    update(game['stock'], '#waste ul', playedCards);
    // update spades pile
    update(game['spades'], '#spades ul', playedCards);
    // update hearts pile
    update(game['hearts'], '#hearts ul', playedCards);
    // update diamonds pile
    update(game['diamonds'], '#diamonds ul', playedCards);
    // update clubs pile
    update(game['clubs'], '#clubs ul', playedCards);
    // update tableau
    var tabs = game['tableau'];
    // loop through tableau piles
    for (var i = 1; i <= 7; i++) {
       // update tableau pile
       update(tabs[i], '#stack li:nth-child('+i+') ul', playedCards, true);
    }

}

//     // get unplayed tab cards
//     unplayedTabCards = getUnplayedTabCards();

//     // size cards
//     sizeCards();

//     // show table
//     $game.style.opacity = '100';

//     console.log('Table Rendered:', table);
//     return;
//  }

// // update piles
//  function update(pile, selector, playedCards, append) {
//     var e = d.querySelector(selector);
//     var children = e.children; // get children
//     var grandParent = e.parentElement.parentElement; // get grand parent
//     // reset pile
//     e.innerHTML = '';
//     // loop through cards in pile
//     for (var card in pile) {
//        card = pile[card];
//        // get html template for card
//        var html = getTemplate(card);
//        // create card in pile
//        createCard(card, selector, html, append);
//     }
//     // turn cards face up
//     flipCards(playedCards, 'up');
//     // count played cards
//     var played = countPlayedCards(children);
//     e.parentElement.dataset.played = played;
//     // count all played cards for #tab and #fnd piles
//     if ( grandParent.id === 'tab' || grandParent.id === 'fnd' ) {
//        var playedAll = parseInt(grandParent.dataset.played);
//        if ( isNaN(playedAll) ) playedAll = 0;
//        grandParent.dataset.played = playedAll + played;
//     }
//     // count unplayed cards
//     var unplayed = countUnplayedCards(children);
//     e.parentElement.dataset.unplayed = unplayed;
//     // count all unplayed cards for #tab and #fnd piles
//     if ( grandParent.id === 'tab' || grandParent.id === 'fnd' ) {
//        var unplayedAll = parseInt(grandParent.dataset.unplayed);
//        if ( isNaN(unplayedAll) ) unplayedAll = 0;
//        grandParent.dataset.unplayed = unplayedAll + unplayed;
//     }
//     return pile;
//  }


window.addEventListener('load', load);