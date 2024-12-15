import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import '../style/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import NavBarStyle from '../style/Navbar.module.css';
import { logout } from '../redux/slices/authenticationslice';
import { useAppDispatch } from '../redux/store';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation(); 

  const [tabs, setTabs] = useState(true);

  useEffect(() => {
   
    if (location.pathname === '/analytics') {
      setTabs(false);
    } else {
      setTabs(true);
    }
  }, [location]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className={NavBarStyle.nav}>
      <div style={{ display: 'flex', width: '80%' }}>
        <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Link
            to="/users"
            className={`${tabs ? 'activeTabed' : ''} ${NavBarStyle.link}`}
            onClick={() => setTabs(true)}
          >
            User Dashboard
          </Link>
        </span>
        <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Link
            to="/analytics"
            className={`${!tabs ? 'activeTabed' : ''} ${NavBarStyle.link}`}
            onClick={() => setTabs(false)}
          >
            Analytics Dashboard
          </Link>
        </span>
      </div>
      <div
        id={NavBarStyle.LogoutWrapper}
        className="curPoint"
        onClick={() => {
          handleLogout();
        }}
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
      </div>
    </nav>
  );
};

export default Navbar;
