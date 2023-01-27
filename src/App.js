import "./styles.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./home";
import Grid from "./grid";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/grid/:id" element={<Grid />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
