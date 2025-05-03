
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Admin.css';

const Admin = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  }, []);

  const approvePost = (id) => {
    axios.put(`http://localhost:5000/approve`,{_id:id,status: "approved" })
      .then(() => window.location.reload())
      .catch(err => console.log(err));
  };

  const rejectPost = (id) => {
    axios.delete(`http://localhost:5000/posts/${id}`)
      .then(() => window.location.reload())
      .catch(err => console.log(err));
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard 🛠️</h2>
      <div className="posts-grid">
        {posts.length > 0 ? posts.map(post => (
          <div className="post-card" key={post._id}>
            <h3>{post.title}</h3>
            <p><strong>Category:</strong> {post.cat}</p>
            <p><strong>Author:</strong> {post.uname}</p>
            <p><strong>Status:</strong> {post.status}</p>
            <div className="admin-buttons">
              {post.status !== "approved" && (
                <button onClick={() => approvePost(post._id)} className="approve-btn">Approve</button>
              )}
              <button onClick={() => rejectPost(post._id)} className="reject-btn">Reject</button>
            </div>
          </div>
        )) : (
          <p className="loading-text">Loading posts...</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
