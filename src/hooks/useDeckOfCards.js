import { useState, useEffect, useCallback } from "react";
import {
  shuffleNewDeck,
  reshuffleDeck,
  drawCards,
  addToPile,
  listPileCards,
} from "../utils/api";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/helper";

function useDeckOfCardsAPI() {
  const [deckId, setDeckId] = useState(null);
  const [cardsRemaining, setCardsRemaining] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [pileCards, setPileCards] = useState({});

  const updateDeck = useCallback((deckData) => {
    if (deckData && deckData.success) {
      setDeckId(deckData.deck_id);
      setCardsRemaining(deckData.remaining);
      saveToLocalStorage("deckId", deckData.deck_id);
    }
  }, []);

  const initializeDeck = useCallback(async () => {
    const storedDeckId = getFromLocalStorage("deckId");
    setIsLoading(true);

    try {
      let deckData;
      if (storedDeckId) {
        deckData = await reshuffleDeck(storedDeckId);
      }
      if (!deckData || !deckData.success) {
        deckData = await shuffleNewDeck();
      }
      updateDeck(deckData);
    } catch (error) {
      console.error("Failed to initialize deck:", error);
    } finally {
      setIsLoading(false);
    }
  }, [updateDeck]);

  useEffect(() => {
    initializeDeck();
  }, [initializeDeck]);

  const drawAndAddToPile = useCallback(
    async (pileName, count = 1) => {
      if (!deckId || isLoading) return;

      try {
        const result = await drawCards(deckId, count);
        if (result.success) {
          setCardsRemaining(result.remaining);
          const cardCodes = result.cards.map((card) => card.code).join(",");
          const addToPileResult = await addToPile(deckId, pileName, cardCodes);
          if (addToPileResult.success) {
            const updatedPileCards = await listPileCards(deckId, pileName);
            if (updatedPileCards.success) {
              setPileCards((prev) => ({
                ...prev,
                [pileName]: updatedPileCards.piles[pileName].cards,
              }));
            }
          }
        }
      } catch (error) {
        console.error("Failed to draw and add to pile:", error);
      }
    },
    [deckId, isLoading],
  );

  const resetGame = useCallback(async () => {
    if (!deckId) return;
    try {
      const response = await reshuffleDeck(deckId);
      if (response.success) {
        setCardsRemaining(response.remaining);
        setPileCards({});
      }
    } catch (error) {
      console.error("Failed to reset game:", error);
    }
  }, [deckId]);

  return {
    deckId,
    cardsRemaining,
    isLoading,
    pileCards,
    drawAndAddToPile,
    resetGame,
  };
}

export default useDeckOfCardsAPI;
