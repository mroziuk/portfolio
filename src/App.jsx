import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostDetails from "./components/PostDetails";
import PostList from "./components/PostList";
import "./styles/index.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  return (
    <Router>
      <div className="theme-toggle">
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          />
        </label>
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route
            path="/posts/:id"
            element={<PostDetails darkMode={darkMode} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;