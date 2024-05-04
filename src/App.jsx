import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Navbar />

      <main>
        <h1>{/* main */}</h1>
      </main>

      <Footer />
    </div>
  );
}

export default App;
