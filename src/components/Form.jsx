function Form() {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    //
  };

  return (
    <form className="flex justify-center gap-2" onSubmit={handleFormSubmit}>
      <input
        className="input input-bordered w-1/2"
        placeholder="1"
        type="number"
        min="0"
        max="100"
        required
      />
      <button className="btn w-1/2">Draw</button>
    </form>
  );
}

export default Form;
