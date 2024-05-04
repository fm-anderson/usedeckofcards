function Form() {
  return (
    <form className="flex gap-2">
      <input
        className="input input-bordered"
        placeholder="1"
        type="number"
        min="0"
        max="100"
        required
      />
      <button className="btn">Draw</button>
    </form>
  );
}

export default Form;
