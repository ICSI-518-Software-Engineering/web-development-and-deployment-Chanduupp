
import React, { useState } from 'react';
import './App.css';
import Addition from './Addition';
import SelfProfile from './SelfProfile';
import Inventory from './Inventory';
import PublicAPI from './PublicAPI';

function App() {
  const [currentPage, setCurrentPage] = useState('selfProfile');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#" onClick={() => handlePageChange('selfProfile')}>
          CU
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className={`nav-item ${currentPage === 'selfProfile' ? 'active' : ''}`}>
              <a className="nav-link" href="#" onClick={() => handlePageChange('selfProfile')}>
                Self Profile
              </a>
            </li>
            <li className={`nav-item ${currentPage === 'addition' ? 'active' : ''}`}>
              <a className="nav-link" href="#" onClick={() => handlePageChange('addition')}>
                Addition
              </a>
            </li>
            <li className={`nav-item ${currentPage === 'inventory' ? 'active' : ''}`}>
              <a className="nav-link" href="#" onClick={() => handlePageChange('inventory')}>
                Inventory
              </a>
            </li>
            <li className={`nav-item ${currentPage === 'publicAPI' ? 'active' : ''}`}>
              <a className="nav-link" href="#" onClick={() => handlePageChange('publicAPI')}>
                Public API
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {currentPage === 'selfProfile' && <SelfProfile />}
      {currentPage === 'addition' && <Addition />}
      {currentPage === 'inventory' && <Inventory />}
      {currentPage === 'publicAPI' && <PublicAPI />}
    </div>
  );
}

export default App;

