function PileList({ pileName = "discarded", cards }) {
  return (
    <div className="my-3">
      <h3>
        <span className="opacity-70">{pileName}</span> Pile
      </h3>
      <ul className="flex gap-1">
        {cards.map((card, index) => (
          <li key={index}>
            <img
              src={card.image}
              alt={`${card.value} of ${card.suit}`}
              className="w-24"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PileList;
