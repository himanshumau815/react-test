import "./styles.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./components/home";
import Grid from "./components/grid";

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
