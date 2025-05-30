import { useState, useEffect } from 'react';
import Section from './components/Section';
import PostDetails from './components/PostDetails';
import './styles/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { usePosts } from './hooks/usePosts';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { posts: allPosts, loading, error } = usePosts();
  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);
  console.log(allPosts);
  const latest = allPosts?.filter(p => p.category === 'latest') || [];
  const projects = allPosts?.filter(p => p.category === 'project') || [];
  const til = allPosts?.filter(p => p.category === 'til') || [];

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
          <Route path="/" element={
            <>
              {loading && <p>Loading...</p>}
              {error && <p>Error: {error}</p>}
              {!loading && !error && (
                <>
                  <Section name="Latest Posts" posts={latest} />
                  <Section name="Projects" posts={projects} />
                  <Section name="Today I Learned" posts={til} />
                </>
              )}
            </>
          } />
          <Route path="/posts/:id" element={<PostDetails allPosts={allPosts} darkMode={darkMode} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
