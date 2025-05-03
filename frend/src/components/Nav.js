import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Ct from './Ct';
import '../styles/Nav.css';

const Nav = () => {
  const { state } = useContext(Ct);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate('/')}>
        📰 NewsSphere
      </div>

      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
            Home
          </NavLink>
        </li>
        {state.token ? (
          <>
            <li>
              <NavLink to="/addpost" className={({ isActive }) => isActive ? "active" : ""}>
                Add Post
              </NavLink>
            </li>
            <li>
              <NavLink to="/logout" className={({ isActive }) => isActive ? "active" : ""}>
                Logout
              </NavLink>
            </li>
            {state.role === "admin" && (
              <li>
                <NavLink to="/admin" className={({ isActive }) => isActive ? "active" : ""}>
                  Admin
                </NavLink>
              </li>
            )}
          </>
        ) : (
          <>
            <li>
              <NavLink to="/reg" className={({ isActive }) => isActive ? "active" : ""}>
                Register
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>
                Login
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
