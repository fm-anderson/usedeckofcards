import { useState, useCallback, useEffect } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/helper";
import {
  applyDeckData,
  reshuffleDeck,
  drawCards,
  addToPile,
  listPileCards,
  initializeDeckWithPile,
} from "../utils/api";

function useDeckOfCards() {
  const [deckId, setDeckId] = useState(getFromLocalStorage("deckId") || null);
  const [cardsRemaining, setCardsRemaining] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pileCards, setPileCards] = useState([]);

  const updateDeck = useCallback((deckData) => {
    if (deckData && deckData.success) {
      setDeckId(deckData.deck_id);
      setCardsRemaining(deckData.remaining);
      saveToLocalStorage("deckId", deckData.deck_id);
    }
  }, []);

  const initializeDeck = useCallback(async () => {
    setIsLoading(true);
    try {
      let deckData;
      if (!deckId) {
        deckData = await initializeDeckWithPile();
        updateDeck(deckData);
      } else {
        deckData = await applyDeckData(deckId);
        updateDeck(deckData);
        const pileNames = await listPileCards(deckId);

        if (pileNames.success) {
          if (Object.keys(pileNames.piles).length > 0) {
            updatePileCards();
          } else {
            console.warn("No piles to update.");
          }
        } else {
          console.warn("Invalid pile data received.");
        }
      }
    } catch (error) {
      console.error("Failed to initialize deck:", error);
    } finally {
      setIsLoading(false);
    }
  }, [deckId, updateDeck]);

  useEffect(() => {
    initializeDeck();
  }, [initializeDeck]);

  const drawAndAddToPile = useCallback(
    async (pileName, count = 1) => {
      pileName = pileName || "discard";

      if (!deckId || isLoading) {
        console.warn(
          "Action skipped: no deck ID or operation is currently loading.",
        );
        return;
      }

      if (!/^[a-zA-Z0-9]+$/.test(pileName)) {
        console.warn(
          "Invalid pile name: The pile name must consist only of alphanumeric characters without any spaces or special characters.",
        );
        return;
      }

      try {
        const result = await drawCards(deckId, count);
        if (result.success) {
          setCardsRemaining(result.remaining);
          const cardCodes = result.cards.map((card) => card.code).join(",");
          const addToPileResult = await addToPile(deckId, pileName, cardCodes);
          if (addToPileResult.success) {
            const updatedPileCards = await listPileCards(deckId, pileName);
            if (updatedPileCards.success) {
              setPileCards((prev) => [
                ...prev.filter((card) => card.pileName !== pileName),
                ...updatedPileCards.piles[pileName].cards.map((card) => ({
                  ...card,
                  pileName,
                })),
              ]);
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
        setPileCards([]);
      }
    } catch (error) {
      console.error("Failed to reset game:", error);
    }
  }, [deckId]);

  const updatePileCards = useCallback(async (deckId, pileNames) => {
    const updatedPileCards = [];
    for (const pileName of Object.keys(pileNames.piles)) {
      const cards = await fetchPileCards(deckId, pileName);
      updatedPileCards.push(...cards);
    }
    setPileCards(updatedPileCards);
  }, []);

  return {
    deckId,
    cardsRemaining,
    isLoading,
    pileCards,
    drawAndAddToPile,
    resetGame,
    initializeDeck,
  };
}

export default useDeckOfCards;
