import React, { useContext, useState, useEffect } from 'react';
import './header.css';
import { navigationData } from '../../data/Data';
import { Link, useHistory } from 'react-router-dom';
import { CompareContext } from '../../appService/compareService';
import { TenureContext } from '../../appService/TenureProvider';
import { showToast } from '../../appService/Toast/Toast';
import logo from '../../images/logo.png'

const isLoggedIn = () => {
  return !!localStorage.getItem('access_token');
};

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const { compare } = useContext(CompareContext);
  const { tenures, setPropertyTenure } = useContext(TenureContext);
  const [navList, setNavList] = useState(false);
  const [navigationData, setNavigationData] = useState([
    { text: 'home', path: '/' },
    { text: 'about', path: '/about' },
    { text: 'contact', path: '/contact' },
  ]);
  const history = useHistory();

  useEffect(() => {
    const updatedNavigationData = [...navigationData];
    
    // Find the index of the 'home' item
    const homeIndex = updatedNavigationData.findIndex(item => item.text === 'home');

    tenures.forEach((tenure) => {
      const exists = updatedNavigationData.some(item => item.text === tenure.description);
      if (!exists) {
        // Insert tenure right after the 'home' item
        updatedNavigationData.splice(homeIndex + 1, 0, {
          text: tenure.description,
          path: '/listings',
          payload: tenure.name,
        });
      }
    });

    setNavigationData(updatedNavigationData);
  }, [tenures]);

  useEffect(() => {
    const handleStorageChange = () => {
      setLoggedIn(isLoggedIn());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleNavItemClick = async (payload, path) => {
    if (payload) {
      await setPropertyTenure(payload);
    }
    history.push(path);
  };
  return (
    <>
      <header style={navList ? { backgroundColor: '#27ae60' } : { backgroundColor: '#fff' }} >
        <div className='container flex'>
          <Link to='/'>
            <div className='logo'>
              <img src={navList?logo:('./images/logo.png')}   alt='' style={{zIndex: 99999999999999}} />
            </div>
          </Link>
          <div className='nav'>
            <ul className={navList ? 'small' : 'flex'}>
              {navigationData.map((list, index) => (
                <li key={index}>
                  <Link
                    to="#"
                    onClick={() => handleNavItemClick(list.payload, list.path)}
                  >
                    {list.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='button flex'>
            <h4>
              <Link to='/compare'>
                <span id='compare'>{Object.keys(compare).length}</span>Compare
              </Link>
            </h4>
            <Link to='/login'>
              <button className='btn-s'>
                <i className='fa fa-sign-out'></i>
                <h6>Sign In</h6>
              </button>
            </Link>
          </div>
          <div className='toggle'>
            <button onClick={() => setNavList(!navList)}>
              {navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
