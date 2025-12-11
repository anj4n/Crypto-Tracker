import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CoinDetail from "./Pages/CoinDetail";
import { Coin } from "./pages/Coin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/coin" element={<Coin />} />
        <Route path="/coin/:id" element={<CoinDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
