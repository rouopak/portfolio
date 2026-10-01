import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import ExpandedProjects from "./pages/ExpandedProjects";
import DetailedExpertise from "./pages/DetailedExpertise";
import AdminAnalytics from "./pages/AdminAnalytics";
import Preloader from "./components/Preloader";
import { useVisitorTracker } from "./hooks/useVisitorTracker";

// Wrapper component to activate the visitor tracker hook within Router context
const AppRoutes = () => {
  useVisitorTracker();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/expanded_projects" element={<ExpandedProjects />} />
      <Route path="/detailed_expertise" element={<DetailedExpertise />} />
      <Route path="/admin/analytics" element={<AdminAnalytics />} />
    </Routes>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <Router>
          <AppRoutes />
        </Router>
      )}
    </>
  );
};

export default App;