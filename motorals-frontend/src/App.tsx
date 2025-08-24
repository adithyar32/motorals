
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Bikes from "@/pages/Bikes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/bikes" element={<Bikes />} />
      </Routes>
    </Router>
  );
}

export default App;
