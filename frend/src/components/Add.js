
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Ct from './Ct';
import '../styles/Reg.css'

const Add = () => {
  const { state } = useContext(Ct);
  const navigate = useNavigate();
  const [obj, setObj] = useState({});

  const changeHandler = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
  };

  const addPostHandler = () => {
    const postData = {
      ...obj,
      uname: state.name,
      uid: state._id,
      date: new Date().toISOString().split('T')[0],
    };

    axios.post('http://localhost:5000/add', postData)
      .then(res => {
        alert('Post Added Successfully. Waiting for the approval!');
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="form-container">
      <h2>Create New Article 📰</h2>
      <input type="text" name="title" placeholder="Post Title" onChange={changeHandler} />
      <input type="text" name="cat" placeholder="Category (e.g., sports, tech)" onChange={changeHandler} />
      <textarea name="text" placeholder="Post Content" onChange={changeHandler} rows="6" style={textareaStyle}></textarea>
      <button onClick={addPostHandler}>Add Post</button>
    </div>
  );
};

const textareaStyle = {
  width: '300px',
  padding: '0.8rem 1rem',
  marginBottom: '1rem',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '10px',
  color: 'white',
  fontSize: '1rem',
  outline: 'none',
  transition: 'all 0.3s ease',
  resize: 'none',
};

export default Add;
