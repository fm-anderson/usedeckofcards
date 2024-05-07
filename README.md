# useDeckOfCards

### Description:

The useDeckOfCards hook provides a simple and flexible way to interact with the [Deck of Cards API](https://deckofcardsapi.com/). It allows you to shuffle new decks, draw cards, and manage piles, making it suitable for various card game applications or projects involving card deck management.

Live Example: https://usedeckofcards.netlify.app/

### Key Features:

- Shuffle and Draw Cards: Effortlessly shuffle new decks and draw cards from existing decks.
- Manage Card Piles: Create and manage custom card piles with dynamic names and adjustable card counts.
- Track Deck State: Keep track of remaining cards in the deck and monitor loading states.
- Store Deck Id: To prevent the creation of multiple identical decks, we store the deckId in localStorage.

## Available on NPM

You can review the [package code here](https://github.com/fm-anderson/npm_usedeckofcards/).

```bash
npm install usedeckofcards
```

## File Structure

You can also implement manually using the following file structure:

```
src/
|-- hooks/
|   |-- useDeckOfCards.js
|-- utils/
|   |-- helper.js
|   |-- api.js
```

Copy these files into their respective folders:

- [src/hooks/useDeckOfCards.js](https://github.com/fm-anderson/usedeckofcards/blob/main/src/hooks/useDeckOfCards.js): This file contains the core functionality for managing the deck of cards.
- [src/utils/helper.js](https://github.com/fm-anderson/usedeckofcards/blob/main/src/utils/helper.js): This file contains utility functions for interacting with local storage.
- [src/utils/api.js](https://github.com/fm-anderson/usedeckofcards/blob/main/src/utils/api.js): This file contains utility functions for interacting with the [Deck of Cards API](https://deckofcardsapi.com/).

## Usage

The hook exports several useful functions and states for interacting with a deck of cards. Here's a breakdown:

### States

- `deckId` The ID of the current deck, stored in local storage.
- `cardsRemaining` The number of remaining cards in the deck.
- `isLoading` A boolean indicating whether the deck is currently being loaded.
- `pileCards` An array of cards currently in piles.

### Functions

- `initializeDeck()` Initializes a new deck or reloads an existing deck from local storage. This function checks the deck ID and loads any existing piles of cards.
- `drawAndAddToPile(pileName, count)` Draws a specified number of cards and adds them to a specified pile. It updates the pileCards state with the new cards.
- `resetGame()` Reshuffles the current deck and clears all piles.

## API Integration

The hook interacts with the Deck of Cards API to manage the deck. The following API calls are used:

**1. Shuffle New Deck**

```jsx
const response = await shuffleNewDeck(deckCount);
```

- `deckCount` The number of decks to shuffle (default is 1).
- `Response:`
  - `deck_id` The ID of the new deck.

**2. Draw Cards**

```jsx
const response = await drawCards(deckId, count);
```

- `deckId` The ID of the deck to draw from.
- `count` The number of cards to draw.
- `Response:`
  - `cards` An array of drawn cards.

**3. Reshuffle Deck**

```jsx
const response = await reshuffleDeck(deckId, remaining);
```

- `deckId` The ID of the deck to reshuffle.
- `remaining` A boolean indicating whether to only shuffle the remaining cards.

**4. Add to Pile**

```jsx
const response = await addToPile(deckId, pileName, cards);
```

- `deckId` The ID of the deck.
- `pileName` The name of the pile.
- `cards` The codes of the cards to add to the pile.

**5. List and Fetch Pile Cards**

```jsx
const response = await listPileCards(deckId, pileName);
```

- `deckId` The ID of the deck.
- `pileName` The name of the pile.

## Game Ideas

**1. Blackjack Game**

- The `drawAndAddToPile` function can be used to deal initial cards to each player and then allow them to draw additional cards. The `pileCards` state can track each player's hand.

**2. Poker Game**

- For a poker game, the `initializeDeck` function can be used to shuffle the deck, and `drawAndAddToPile` can deal hands to each player. The game can then progress with betting rounds and the option for players to draw new cards to replace some of their existing cards. The `pileCards` state can be used to store each player's hand, while a community pile can hold the shared cards for games like Texas Hold'em.

**3. Solitaire Game**

- The `initializeDeck` function can be used to shuffle the deck, and `drawAndAddToPile` can set up the initial tableau. The `listPileCards` function can then list the cards in each pile as players move cards around the tableau and foundations.

**4. Go Fish Game**

- The `drawAndAddToPile` function can be used to deal the initial hand to each player and allow them to draw cards when they need to "go fish." The `pileCards` state can keep track of each player's hand.

**5. Crazy Eights Game**

- The `initializeDeck` function can set up the game, while `drawAndAddToPile` allows players to draw and discard cards as they play. The `pileCards` state can track the players' hands and the discard pile.

## Acknowledgements

This project uses the [Deck of Cards API](https://deckofcardsapi.com/) for card management. This API provides functionalities for creating and shuffling decks, drawing cards, managing piles, and more. The hook is designed to make full use of this API's capabilities while simplifying the integration for different card game scenarios.
