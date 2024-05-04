import useDeckOfCards from "../hooks/useDeckOfCards";
import Form from "./Form";
import PileList from "./PileList";

function Main() {
  const {
    deckId,
    cardsRemaining,
    isLoading,
    pileCards,
    drawAndAddToPile,
    resetGame,
  } = useDeckOfCards();

  const getPileNames = Array.from(
    new Set(pileCards.map((card) => card.pileName)),
  );

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
          <Form drawAndAddToPile={drawAndAddToPile} />
          <button className="btn" onClick={resetGame}>
            Shuffle
          </button>
        </div>
      </div>
      <div className="flex w-full flex-wrap justify-center gap-4">
        {getPileNames.map((pileName) => {
          const cards = pileCards.filter((card) => card.pileName === pileName);
          return <PileList key={pileName} pileName={pileName} cards={cards} />;
        })}
      </div>
    </main>
  );
}

export default Main;
