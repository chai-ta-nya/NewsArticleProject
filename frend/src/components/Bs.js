
import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import Ct from './Ct';
import '../styles/All.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Bs = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [f, setF] = useState(false); 
  const { state } = useContext(Ct);

  useEffect(() => {
    axios.get('http://localhost:5000/posts/business')
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  }, [f]);
  const handleLike = (id) => {
    if (state.token !== "") {
      axios.post("http://localhost:5000/addlike", { _id: id, uid: state._id })
        .then((res) => {
          toast(res.data.msg.includes("removed") ? "Like removed 🔁" : "You liked this post 👍");
          setF(!f);
        })
        .catch(() => toast.error("Something went wrong"));
    } else {
      toast.info("Please login to like");
    }
  };
  
  const handleDislike = (id) => {
    if (state.token !== "") {
      axios.post("http://localhost:5000/adddlike", { _id: id, uid: state._id })
        .then((res) => {
          toast(res.data.msg.includes("removed") ? "Dislike removed 🔁" : "You disliked this post 👎");
          setF(!f);
        })
        .catch(() => toast.error("Something went wrong"));
    } else {
      toast.info("Please login to dislike");
    }
  };
  
  return (
    <div className="cards-container">
          {posts.length > 0 ? posts.map(post => (
            <div className="news-card fade-in" key={post._id}>
              <h2 className="news-title">{post.title}</h2>
              <p className="news-category">{post.cat}</p>
              <p className="news-text">
                {post.text.length > 150 ? `${post.text.slice(0, 150)}...` : post.text}
              </p>
              <p className="news-author">By {post.uname}</p>
              <p className="news-date">{post.date}</p>
    
              {post.text.length > 150 && (
                <button className="read-more-btn fade-up" onClick={() => setSelectedPost(post)}>
                  Read Full Article →
                </button>
              )}
              {state.token && (
                <div className="reaction-buttons">
                  <button className={`like-btn ${post.likes?.includes(state._id) ? 'active-reaction' : ''}`}onClick={() => handleLike(post._id)}>👍 {post.likes?.length || 0}</button>
                  <button className={`dislike-btn ${post.dlikes?.includes(state._id) ? 'dactive-reaction' : ''}`}onClick={()=>handleDislike(post._id)}>👎 {post.dlikes?.length || 0}</button>
                </div>
              )}
            </div>
          )) : (
            <p className="loading-text">Loading Articles...</p>
          )}
          {selectedPost && (
            <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>{selectedPost.title}</h2>
                <p><strong>Category:</strong> {selectedPost.cat}</p>
                <p className="modal-text">{selectedPost.text}</p>
                <p><em>By {selectedPost.uname} | {selectedPost.date}</em></p>
                <button className="read-more-btn" onClick={() => setSelectedPost(null)}>Close</button>
              </div>
            </div>
          )}
          <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar newestOnTop closeOnClick pauseOnFocusLoss={false} draggable pauseOnHover/>
    </div>
  );
};
    

export default Bs;
