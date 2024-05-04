const Deck = () => {
  const cards = Array.from({ length: 52 });

  return (
    <div className="relative h-56 w-40">
      {cards.map((_, index) => (
        <div
          key={index}
          className="absolute h-56 w-40"
          style={{
            top: index * 1,
            left: index * 1,
            zIndex: index,
            transform: `rotate(${index * 0}deg)`,
          }}
        >
          <img
            src="https://deckofcardsapi.com/static/img/back.png"
            className="h-full w-full rounded-lg object-cover shadow-lg"
            alt={`Card ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

export default Deck;
