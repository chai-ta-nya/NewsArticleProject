
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Welcome.css';

const Welcome = ({ name }) => {
  return (
    <div className="welcome-container">
      <h2>Welcome, {name}! 🎉</h2>
      <p>Glad to see you back on NewsSphere 📰</p>
      <div className="welcome-links">
        <Link to="/addpost" className="welcome-btn">Create New Post</Link>
        <Link to="/pdm" className="welcome-btn">View My Posts</Link>
        <Link to="/all" className="welcome-btn">Browse All News</Link>
      </div>
    </div>
  );
};

export default Welcome;
