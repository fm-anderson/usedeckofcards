import useDeckOfCards from "../hooks/useDeckOfCards";
import Form from "./Form";
import PileList from "./PileList";

function Main() {
  const { deckId, cardsRemaining, pileCards, drawAndAddToPile, resetGame } =
    useDeckOfCards();

  const getPileNames = Array.from(
    new Set(pileCards.map((card) => card.pileName)),
  )
    .filter((pileName) => pileName !== "discarded")
    .sort((a, b) => a.localeCompare(b));

  if (pileCards.some((card) => card.pileName === "discarded")) {
    getPileNames.push("discarded");
  }

  return (
    <main className="flex flex-col items-center text-base-100">
      <div className="mb-4">
        <div className="mb-1">
          <p>
            <span className="opacity-70">deck_id:</span> {deckId}
          </p>
          <p>Cards Remaining: {cardsRemaining}</p>
        </div>
        <div className="flex flex-col gap-2">
          <Form drawAndAddToPile={drawAndAddToPile} resetGame={resetGame} />
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-4">
        {getPileNames.map((pileName) => {
          const cards = pileCards.filter((card) => card.pileName === pileName);
          return (
            <div key={pileName} className="flex w-full justify-center">
              <PileList pileName={pileName} cards={cards} />
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default Main;
