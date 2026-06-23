import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ExpandedProjects from "./pages/ExpandedProjects";
import DetailedExpertise from "./pages/DetailedExpertise";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expanded_projects" element={<ExpandedProjects />} />
        <Route path="/detailed_expertise" element={<DetailedExpertise />} />
      </Routes>
    </Router>
  );
};

export default App;