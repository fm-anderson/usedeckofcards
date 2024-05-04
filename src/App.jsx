import Footer from "./components/Footer";
import Form from "./components/Form";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Navbar />

      <main className="flex justify-center">
        <div>
          <span>
            <p>Cards Remaining: 52</p>
            <p>Deck Id: 3p40paa87x90</p>
          </span>
          <Form />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
