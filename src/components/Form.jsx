import { useState, useCallback } from "react";

function Form({ drawAndAddToPile, resetGame }) {
  const [drawCount, setDrawCount] = useState("");
  const [pileName, setPileName] = useState("");
  const [error, setError] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const settedPileName = pileName.trim();
    if (!/^[a-zA-Z0-9-_]+$/.test(settedPileName) && settedPileName !== "") {
      setError("Pile name can only contain alphanumeric characters.");
      return;
    }

    drawAndAddToPile(settedPileName, drawCount || 1);
    setError("");
    setPileName("");
  };

  const handleDrawCountChange = (e) => {
    const value = e.target.value;
    setDrawCount(value === "" ? "" : Number(value));
  };

  const handlePileNameChange = (e) => {
    const input = e.target.value;
    if (/^[a-zA-Z0-9-_]*$/.test(input)) {
      setPileName(input);
      setError("");
    } else {
      setError("Pile name can only contain alphanumeric characters.");
    }
  };

  const handleShuffle = useCallback(() => {
    resetGame();
    setDrawCount("");
    setPileName("");
    setError("");
  }, [resetGame]);

  return (
    <>
      <form
        className="flex flex-col items-center gap-2"
        onSubmit={handleFormSubmit}
      >
        <div className="flex gap-2">
          <input
            className="input input-bordered w-1/2 text-neutral"
            placeholder="1"
            type="number"
            min="0"
            max="52"
            required
            value={drawCount}
            onChange={handleDrawCountChange}
          />
          <input
            className="input input-bordered w-1/2 text-neutral"
            placeholder="PileName"
            type="text"
            value={pileName}
            onChange={handlePileNameChange}
          />
          <button className="btn w-1/4" type="submit">
            Draw
          </button>
        </div>
        {error && <p className="text-warning">{error}</p>}
      </form>
      <button className="btn" onClick={handleShuffle}>
        Shuffle
      </button>
    </>
  );
}

export default Form;
