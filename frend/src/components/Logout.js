import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Ct from './Ct';
import '../styles/Logout.css'; 
import Cookies from 'js-cookie';

const Logout = () => {
  const { updstate } = useContext(Ct);
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    Cookies.remove("con");
    updstate({ "_id": "", "name": "", "token": "", "role": "" });
    const timer = setTimeout(() => {
      setShowMessage(false);
      navigate('/all');
    }, 2000);
    return () => clearTimeout(timer); 
  }, [navigate, updstate]);

  return (
    showMessage && (
      <div className="logout-container">
        <h1>You have been logged out. 👋</h1>
        <p>Redirecting to news feed...</p>
      </div>
    )
  );
};

export default Logout;
