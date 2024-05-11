import Navbar from "./components/Navbar";
import Blackjack from "./components/Blackjack";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-gradient-to-b from-[#1b4c1d] to-[#318834]">
      <div className="mx-auto flex min-h-screen max-w-screen-2xl flex-col justify-between">
        <Navbar />
        <Blackjack />

        <Main />

        <Footer />
      </div>
    </div>
  );
}

export default App;
