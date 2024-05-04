import { useState } from "react";

function Form({ drawAndAddToPile }) {
  const [drawCount, setDrawCount] = useState("");
  const [pileName, setPileName] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const finalPileName = pileName.trim() || "discarded";
    drawAndAddToPile(finalPileName, drawCount || 0);
  };

  const handleDrawCountChange = (e) => {
    const value = e.target.value;
    setDrawCount(value === "" ? "" : Number(value));
  };

  return (
    <form className="flex justify-center gap-2" onSubmit={handleFormSubmit}>
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
        placeholder="Pile name"
        type="text"
        value={pileName}
        onChange={(e) => setPileName(e.target.value)}
      />
      <button className="btn w-1/4" type="submit">
        Draw
      </button>
    </form>
  );
}

export default Form;
