
import React, { useContext, useEffect } from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import Ct from './Ct';
import Cookies from 'js-cookie';
import Welcome from './Welcome';
import '../styles/Home.css';

const Home = () => {
  const obj = useContext(Ct);
  const location = useLocation();

  useEffect(() => {
    const x = Cookies.get("con");
    if (x !== undefined) {
      obj.updstate(JSON.parse(x));
    }
  }, []);

  const isHomeRoot = location.pathname === '/';

  return (
    <div className="hcon">
      <div className="left">
        <Link to="/all">All</Link>
        <Link to="/business">Business</Link>
        <Link to="/sports">Sports</Link>
        <Link to="/education">Education</Link>
        <Link to="/entertainment">Entertainment</Link>
        <Link to="/tech">Tech</Link>
        {obj.state.token !== "" && <Link to="/pdm">PDM</Link>}
      </div>

      <div className="right">
        {isHomeRoot && obj.state.token === "" ? (
          <Navigate to="/all" />
        ) : isHomeRoot && obj.state.token !== "" ? (
          <Welcome name={obj.state.name} />
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Home;
