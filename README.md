# Solitaire

/*
1. Define required constants:
	13 card values Ace, 2-10, jack, queen, king
	4 suits -  diamonds, hearts, clubs, spades (52 cards total)

2. Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant:
	Store the 13 elements that represent the squares on the page. 
        2 draw stacks
        7 play piles
        4 stacks for the suits

3. State of board
    when player moves a card from one stack to another, show the values on all cards in the stack -- not full card just enough to read value
    ace stack will remain empty until ace is placed, then cards will increase in value as placed

4. Upon loading the app should:
	shuffle cards and place on the board as follows:
        7 columns increasing from 1 card to 7 cards 
            The top card of each row should be face up. If there is only 1 card, that card is face up. the rest are face down
        1 draw pile (cards face down with an empty pile next to it)
            On first click / user interaction - flip card from draw pile and place in stack to the right face up.
        4 empty spaces for the suits
    
	
		Render a message:
		If no moves left render game over
		If winner render game won

5. Handle a player dragging / clicking a card:
	Obtain the index of the card that was clicked and the input the user dropped the card onto.
        verify if the move is valid -
            if card ++ and opposite color from card placed, valid move
        if card is not the next one in suit or not opposite color, false; move invalid
            render invalid move message

        Move card to the ace stack if card value is next and same suit

        Repeat cycle until the user clicks the draw pile (indicating there are no more moves)
            flip card from draw stack into the pile, replacing the previously shown card

        IF there are no more cards left in the draw pile and user clicks the empty draw box, flip discard stack and start pile from beginning
        
6. Game ends when there are no moves left to be made (lose) 
    or each ace stacks hold the entire suit value -- ace - king 
            test if game is won by verifying 13 cards in each ace stack - kings should be on top

7. Handle a player clicking the menu button:
    replay button:
        Reset the board to the initial state
    sound effect toggle switch -- remember state of toggle switch. If user toggles off, ensure sounds stay off until user toggles back on
    

*/
