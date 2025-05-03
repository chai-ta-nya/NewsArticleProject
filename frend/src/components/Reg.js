import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Reg.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Reg = () => {
  const [obj, setObj] = useState({});
  const [confirmPwd, setConfirmPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
  };

  const registerHandler = () => {
    if (obj.password !== confirmPwd) {
      alert("Passwords do not match!");
      return;
    }
    axios.post('http://localhost:5000/reg', { ...obj, _id: obj.email })
      .then(res => {
        alert('Registration Successful');
        navigate('/login');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="form-container">
      <h2>Register at NewsSphere 📰</h2>

      <input type="text" name="name" placeholder="Name" onChange={changeHandler} />
      <input type="email" name="email" placeholder="Email" onChange={changeHandler} />

      <div className="password-wrapper">
        <input
          type={showPwd ? "text" : "password"}
          name="password"
          placeholder="Password"
          onChange={changeHandler}
        />
        <span onClick={() => setShowPwd(!showPwd)}>
          {showPwd ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <div className="password-wrapper">
        <input
          type={showConfirmPwd ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPwd}
          onChange={(e) => setConfirmPwd(e.target.value)}
        />
        <span onClick={() => setShowConfirmPwd(!showConfirmPwd)}>
          {showConfirmPwd ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <button onClick={registerHandler}>Register</button>
    </div>
  );
};

export default Reg;
