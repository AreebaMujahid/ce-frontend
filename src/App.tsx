import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BrandComparisonPage from "./pages/products";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BrandComparisonPage />} />
      </Routes>
    </Router>
  );
}

export default App;
