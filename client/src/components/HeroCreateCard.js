import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Heroes.css'

export default function HeroCreateCard() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/create');
  };

  return (
    <div className="card plus-card" onClick={handleClick}>
      <span className="plus-sign">+</span>
    </div>
  );
}
