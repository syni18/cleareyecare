import React from 'react'
import './notfound.css';
import notfound from '../../assets/404not-found.svg'

function ErrorNotFound() {
  return (
    <div className="not-found-wrapper">
      <img src={notfound} alt="" />
      <div className="not-found-back">
        <button type="button">Go Back</button>
      </div>
    </div>
  );
}

export default ErrorNotFound;