import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Ct from './Ct';
import '../styles/Reg.css'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const { updstate } = useContext(Ct);
  const navigate = useNavigate();
  const [obj, setObj] = useState({});
  const [showPwd, setShowPwd] = useState(false);

  const changeHandler = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
  };

  const loginHandler = () => {
    axios.post('http://localhost:5000/login', obj)
      .then(res => {
        if (res.data.token) {
          Cookies.set('con', JSON.stringify(res.data), { expires: 7 });
          updstate(res.data); 
          navigate('/');
        } else {
          alert('Invalid credentials');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="form-container">
      <h2>Login to NewsSphere 📰</h2>
      <input type="email" name="_id" placeholder="Email" onChange={changeHandler} />

      <div className="password-wrapper">
        <input
          type={showPwd ? 'text' : 'password'}
          name="pwd"
          placeholder="Password"
          onChange={changeHandler}
        />
        <span onClick={() => setShowPwd(!showPwd)}>
          {showPwd ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <button onClick={loginHandler}>Login</button>
    </div>
  );
};

export default Login;
