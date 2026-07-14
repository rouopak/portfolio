import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import ExpandedProjects from "./pages/ExpandedProjects";
import DetailedExpertise from "./pages/DetailedExpertise";
import Preloader from "./components/Preloader";

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/expanded_projects" element={<ExpandedProjects />} />
            <Route path="/detailed_expertise" element={<DetailedExpertise />} />
          </Routes>
        </Router>
      )}
    </>
  );
};

export default App;