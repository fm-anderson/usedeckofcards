import Form from "./Form";

function Main() {
  return (
    <main className="flex justify-center text-base-100">
      <div>
        <div className="mb-1">
          <p>
            <span className="opacity-70">deck_id:</span> 3p40paa87x90
          </p>
          <p>Cards Remaining: 52</p>
        </div>
        <div className="flex flex-col gap-2">
          <Form />
          <button className="btn">New Deck</button>
        </div>
      </div>
    </main>
  );
}

export default Main;
